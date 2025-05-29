import React, { useEffect, useState, useMemo } from 'react'; // Import useMemo
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';
import HomeNavbar from '../../components/navbar/HomeNavbar';
import { useGetAllQuiz } from '../../hooks/UseQuiz';
import { useGetStudentInformation } from '../../hooks/UseStudent';
import { useNavigate } from 'react-router-dom';


// import '../../components/views/teacher/TeacherProfile.css'
import './StudentProfile.css';
// import StudentProfile from '../../components/views/StudentProfile';


const TopicProgressCard = ({ topicProgress, selectedTopic, setSelectedTopic }) => {
    // Ensure selectedData is not undefined before accessing its properties
    const selectedData = topicProgress.find(t => t.topic === selectedTopic) || { topic: selectedTopic, beginner: 0, intermediate: 0, advanced: 0 };

    return (
        <div className="rightPanel">
            <h2>Lesson Progress</h2>
            <select
                className="topicSelect"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
            >
                {topicProgress.map(topic => (
                    <option key={topic.topic} value={topic.topic}>{topic.topic}</option>
                ))}
            </select>
            <div className="topicCard">
                <h3>{selectedData.topic}</h3>
                {["beginner", "intermediate", "advanced"].map(level => (
                    <div className="stageProgress" key={level}>
                        <p>{level.charAt(0).toUpperCase() + level.slice(1)} Stage</p>
                        <div className="progressDetails">
                            <div className="progressBar">
                                <div className="progressBarFill" style={{ width: `${selectedData[level] * 100}%` }} />
                            </div>
                            <span className="progressText">{Math.round(selectedData[level] * 100)}%</span>
                            <span className="statusText">{Math.round(selectedData[level] * 100) === 0 ? "In progress" : "Finished"}</span> {/* Changed == to === */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const AnalyticsSection = ({ studentScoreList, filteredQuizzesList }) => {
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];
    console.log("Student Score KKK: ", studentScoreList);
    console.log("Filtered Quiz List: ", filteredQuizzesList);

    // You can iterate over filteredQuizzesList and studentScoreList here to display dynamic data
    // For now, using hardcoded values based on your previous structure

    return (
        <div className="analyticsContainer">
            <h2>Record</h2>
            {filteredQuizzesList.map((quiz, index) => {
                // Find the corresponding student score for this quiz
                const studentScoreEntry = studentScoreList.find(
                    (score) => score.quizName === quiz.quizName
                );

                const totalScore = quiz.questions?.length || 0;
                const studentHighestScore = studentScoreEntry?.studentInformation?.score || 0;
                const totalDuration = quiz.duration || 0; // Assuming duration is in minutes
                const studentDuration = studentScoreEntry?.studentInformation?.timeCompletion || 0;
                const totalAttemptsTaken = studentScoreEntry?.studentInformation?.noAttempts || 0;

                return (
                    <div key={quiz.quizName || index} style={{ borderStyle: "solid", borderWidth: '1px', borderColor: "grey", margin: "20px", borderRadius: "5px", padding: "10px", marginBottom: "20px" }}>
                        <div>
                            <div style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "10px" }}>{quiz.quizName || `Quiz ${index + 1}`}</div>
                            <div className='d-flex flex-row' style={{ justifyContent: 'space-around', flexWrap: 'wrap' }}>
                                <div style={{ minWidth: '150px', marginBottom: '10px' }}>
                                    <div className='d-flex flex-row' style={{ marginBottom: "10px" }} >
                                        <div style={{ "marginRight": "10px", fontWeight: "bold" }}>
                                            Total Score:
                                        </div>
                                        <div>
                                            {totalScore}
                                        </div>
                                    </div>

                                    <div className='d-flex flex-row' style={{ "marginRight": "10px", marginBottom: "10px" }}>
                                        <div style={{ "marginRight": "10px", fontWeight: "bold" }}>
                                            Highest Score:
                                        </div>
                                        <div>
                                            {studentHighestScore}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ minWidth: '150px', marginBottom: '10px' }}>
                                    <div className='d-flex flex-row' style={{ marginBottom: "10px" }} >
                                        <div style={{ "marginRight": "10px", fontWeight: "bold" }}>
                                            Total Duration:
                                        </div>
                                        <div>
                                            {totalDuration} min
                                        </div>
                                    </div>

                                    <div className='d-flex flex-row' style={{ "marginRight": "10px", marginBottom: "10px" }}>
                                        <div style={{ "marginRight": "10px", fontWeight: "bold" }}>
                                            Your Duration:
                                        </div>
                                        <div>
                                            {studentDuration} min
                                        </div>
                                    </div>
                                </div>

                                <div style={{ minWidth: '150px', marginBottom: '10px' }}>
                                    <div className='d-flex flex-row' style={{ marginBottom: "10px" }}>
                                        <div style={{ "marginLeft": "10px", "marginRight": "10px", fontWeight: "bold" }}>
                                            Total Attempts Taken:
                                        </div>
                                        <div>
                                            {totalAttemptsTaken}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const RadarChartSection = ({ beginnerScore, beginnerTotalScore, intermediateScore, intermediateTotalScore, advanceScore, advanceTotalScore }) => {
    const radarChartData = [
        { subject: 'Beginner', A: beginnerScore, fullMark: beginnerTotalScore > 0 ? beginnerTotalScore : 1 },
        { subject: 'Intermediate', A: intermediateScore, fullMark: intermediateTotalScore > 0 ? intermediateTotalScore : 1 },
        { subject: 'Advanced', A: advanceScore, fullMark: advanceTotalScore > 0 ? advanceTotalScore : 1 },
    ];

    return (
        <div className="radarchart-container">
            <h2>Proficiency Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} />
                    <Radar name="Student Score" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

function StudentProfile({ userData, onUpdatePassword }) {
    // Destructure with default empty objects to prevent errors during initial render
    const navigate = useNavigate()
    const { data: studentScoreData, loading: studentLoading, error: studentError } = useGetStudentInformation();
    const { data: quizData, loading: quizLoading, error: quizError } = useGetAllQuiz();

    // Safely access the data, providing empty arrays if data is not yet available
    const ListOfStudentScore = studentScoreData || { studentInformation: [] };
    const ListOfQuizzes = quizData || { allQuizzes: [] };

    const [beginnerTotalScore, setbeginnerTotalScore] = useState(0)
    const [intermediateTotalScore, setintermediateTotalScore] = useState(0)
    const [advanceTotalScore, setadvanceTotalScore] = useState(0)

    const [beginnerScore, setbeginnerScore] = useState(0)
    const [intermediateScore, setintermediateScore] = useState(0)
    const [advanceScore, setadvanceScore] = useState(0)

    const [selectedTopic, setSelectedTopic] = useState("Topic 1:  Introduction to Probability");

    // Use useMemo to memoize the filtered data for AnalyticsSection
    const studentQuizNames = useMemo(() => {
        return new Set((ListOfStudentScore.studentInformation || []).map(student => student.quizName));
    }, [ListOfStudentScore.studentInformation]);

    const filteredQuizzes = useMemo(() => {
        return (ListOfQuizzes.allQuizzes || []).filter(quiz => studentQuizNames.has(quiz.quizName));
    }, [ListOfQuizzes.allQuizzes, studentQuizNames]);

    const newListOfstudentSocre = ListOfStudentScore.studentInformation || [];


    // Calculate topicProgress based on the current state
    const topicProgress = [
        { topic: "Topic 1:  Introduction to Probability", beginner: beginnerTotalScore === 0 ? 0 : beginnerScore / beginnerTotalScore, intermediate: intermediateTotalScore === 0 ? 0 : intermediateScore / intermediateTotalScore, advanced: advanceTotalScore === 0 ? 0 : advanceScore / advanceTotalScore },
        { topic: "Topic 2: Equally Likely & Complementary Events", beginner: beginnerTotalScore === 0 ? 0 : beginnerScore / beginnerTotalScore, intermediate: intermediateTotalScore === 0 ? 0 : intermediateScore / intermediateTotalScore, advanced: advanceTotalScore === 0 ? 0 : advanceScore / advanceTotalScore },
        { topic: "Topic 3: Types of Probability", beginner: beginnerTotalScore === 0 ? 0 : beginnerScore / beginnerTotalScore, intermediate: intermediateTotalScore === 0 ? 0 : intermediateScore / intermediateTotalScore, advanced: advanceTotalScore === 0 ? 0 : advanceScore / advanceTotalScore },
        { topic: "Topic 4: Mutually and Not Mutually Exclusive Events", beginner: beginnerTotalScore === 0 ? 0 : beginnerScore / beginnerTotalScore, intermediate: intermediateTotalScore === 0 ? 0 : intermediateScore / intermediateTotalScore, advanced: advanceTotalScore === 0 ? 0 : advanceScore / advanceTotalScore },
    ];

    useEffect(() => {
        console.log("Beginner score: " + beginnerScore);
    }, [beginnerScore]);

    useEffect(() => {
        console.log("Beginner total score: " + beginnerTotalScore);
    }, [beginnerTotalScore]);

    useEffect(() => {
        console.log("I score: " + intermediateScore);
    }, [intermediateScore]);

    useEffect(() => {
        console.log("I total score: " + intermediateTotalScore);
    }, [intermediateTotalScore]);

    useEffect(() => {
        console.log("A score: " + advanceScore);
    }, [advanceScore]);

    useEffect(() => {
        console.log("A total score: " + advanceTotalScore);
    }, [advanceTotalScore]);


    useEffect(() => {
        if (studentLoading || quizLoading) {
            // Still loading, do nothing yet
            return;
        }

        if (studentError || quizError) {
            console.error("Error fetching data:", studentError || quizError);
            // Handle error, e.g., display an error message
            return;
        }

        let beginnerScoreCount = 0;
        let beginnerTotal = 0;
        let intermediateScoreCount = 0;
        let intermediateTotal = 0;
        let advanceScoreCount = 0;
        let advanceTotal = 0;


        // Filter quizzes based on the selected topic
        const topicNumber = selectedTopic.replace('Topic ', '');
        const topicFilteredQuizzes = filteredQuizzes.filter(quiz => quiz.topic === topicNumber);


        // Create a set of quiz names from the topic-filtered quizzes for efficient lookup
        const topicFilteredQuizNames = new Set(topicFilteredQuizzes.map(quiz => quiz.quizName));

        // Filter student scores to include only those for quizzes in the topicFilteredQuizzes
        const relevantStudentScores = newListOfstudentSocre.filter(scoreEntry =>
            topicFilteredQuizNames.has(scoreEntry.quizName)
        );

        // No need to set states for filteredStudentScores and usefilteredQuizzes here,
        // as they are now derived using useMemo for the AnalyticsSection.
        // The AnalyticsSection will receive these memoized values directly.

        for (const studentScoreEntry of relevantStudentScores) {
            const quiz = topicFilteredQuizzes.find(q => q.quizName === studentScoreEntry.quizName);

            if (quiz) { // Ensure a corresponding quiz is found
                const studentScore = studentScoreEntry.studentInformation.score;
                const passingScore = (quiz.questions?.length || 0) * 0.6;


                if (quiz.level === 1) {
                    beginnerTotal++;
                    if (studentScore >= passingScore) {
                        beginnerScoreCount++;
                    }
                } else if (quiz.level === 2) {
                    intermediateTotal++;
                    if (studentScore >= passingScore) {
                        intermediateScoreCount++;
                    }
                } else if (quiz.level === 3) {
                    advanceTotal++;
                    if (studentScore >= passingScore) {
                        advanceScoreCount++;
                    }
                }
            }
        }

        setbeginnerTotalScore(beginnerTotal);
        setbeginnerScore(beginnerScoreCount);
        setintermediateTotalScore(intermediateTotal);
        setintermediateScore(intermediateScoreCount);
        setadvanceTotalScore(advanceTotal);
        setadvanceScore(advanceScoreCount);
    }, [selectedTopic, studentLoading, quizLoading, studentError, quizError, filteredQuizzes, newListOfstudentSocre]); // Added new dependencies


    // Handle loading and error states for the entire component
    if (studentLoading || quizLoading) {
        return <div className="loading">Loading student profile data...</div>;
    }

    if (studentError || quizError) {
        return <div className="error">Error loading data: {studentError?.message || quizError?.message}</div>;
    }

    // Ensure userData and its properties are safely accessed
    const createdDate = userData?.createdAt
        ? new Date(userData.createdAt._seconds * 1000 + userData.createdAt._nanoseconds / 1000000)
        : null;
    const formattedDate = createdDate ? createdDate.toLocaleString() : "N/A";
    const username = userData?.name || "Student"; // Default username

    const totalAttempts = beginnerTotalScore + intermediateTotalScore + advanceTotalScore;
    const totalPassed = beginnerScore + intermediateScore + advanceScore;

    const completionPercentage = totalAttempts === 0 ? 0 : Math.round((totalPassed / totalAttempts) * 100);
    const nextTargetTopic = "Basic Theory";
    const nextTargetStage = "Beginner";


    const badges = [
        { icon: "🐾", label: "PAW MASTER" },
        { icon: "🐾", label: "PAW MASTER" },
        { icon: "🐾", label: "PAW MASTER" },
        { icon: "🐾", label: "PAW MASTER" },
    ];

    return (
        <>
            <HomeNavbar />

            <button className='btn btn-danger'style={{"marginLeft":"40px","marginTop":"30px"}}
                onClick={() => navigate('/lessonPage')}
            >
            {"<"}
        </button>


            <div className="mainGrid">
                <div className="profile-container-v2">
                    <div className="profile-header">
                        <h1>User Profile</h1>
                    </div>

                    <div className="profile-content">
                        <h1>{username}</h1> {/* Use derived username */}


                        <ul className="profile-details">
                            <li><strong>Email:</strong> {userData?.email || "N/A"}</li> {/* Safely access email */}
                            <li><strong>Created at:</strong> {formattedDate}</li>
                        </ul>

                        <button className="update-button" onClick={onUpdatePassword}>Update Password</button>
                    </div>

                </div>


                <div className="topic-progress-container">
                    <TopicProgressCard
                        topicProgress={topicProgress}
                        selectedTopic={selectedTopic}
                        setSelectedTopic={setSelectedTopic}
                    />
                </div>

                <div className="badges-container">
                    <AnalyticsSection studentScoreList={newListOfstudentSocre} filteredQuizzesList={filteredQuizzes} />
                </div>
                <div className="radarchart-container">
                    {/* Pass the memoized filtered quizzes and student scores */}
                    <RadarChartSection
                        beginnerScore={beginnerScore}
                        beginnerTotalScore={beginnerTotalScore}
                        intermediateScore={intermediateScore}
                        intermediateTotalScore={intermediateTotalScore}
                        advanceScore={advanceScore}
                        advanceTotalScore={advanceTotalScore}
                    />
                </div>
            </div>
        </>
    );
};

export default StudentProfile;