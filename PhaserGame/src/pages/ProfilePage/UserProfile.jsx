import React, { useState } from 'react';
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

import './UserProfile.css';

const Header = ({ username }) => (
    <div className="header">
        <div className="headerLeft">
            <span className="logo">Student Analytics</span>
        </div>
        <div className="headerRight">
            <span className="welcome">Welcome, {username}</span>
        </div>
    </div>
);

const ProgressSection = ({ completionPercentage }) => {
    let progressMessage = "";

    if (completionPercentage >= 90) {
        progressMessage = "EXCELLENT!";
    } else if (completionPercentage >= 60) {
        progressMessage = "ALMOST THERE!";
    } else if (completionPercentage >= 30) {
        progressMessage = "KEEP GOING!";
    } else {
        progressMessage = "JUST STARTED!";
    }

    return (
        <div className="progress">
            <div className='circularProgress'>
                <CircularProgressbar
                    value={completionPercentage}
                    text={`${completionPercentage}%`}
                    styles={buildStyles({
                        rotation: 1,
                        strokeLinecap: "round",
                        textColor: '#8A2D3B',
                        pathColor: '#8A2D3B',
                        trailColor: '#e0e0e0',
                        strokeWidth: 8,
                        textSize: '12px',
                    })}
                />
            </div>
            <p className="almostThere">{progressMessage}</p>
        </div>
    );
};


const NextTargetSection = ({ topic, stage }) => (
    <div className="nextTarget">
        <h3>Next Target</h3>
        <p><strong>Topic:</strong> {topic}</p>
        <p><strong>Stage:</strong> {stage}</p>
    </div>
);

const TopicProgressCard = ({ topicProgress, selectedTopic, setSelectedTopic }) => {
    const selectedData = topicProgress.find(t => t.topic === selectedTopic);

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
                            <span className="progressText">{Math.round(selectedData[level] * 4)}/4</span>
                            <span className="statusText">Status: In Progress</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BadgesSection = ({ badges }) => {
    return (
      <div className="badgesContainer">
        <h2>Badges</h2>
        <div className="badgesGrid">
          {badges.map((badge, index) => (
            <div className="badgeCard" key={index}>
              <span className="badgeIcon">{badge.icon}</span>
              <p className="badgeLabel">{badge.label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  

const AnalyticsSection = ({ radarData, radarKeys }) => {
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

    return (
        <div className="analyticsContainer">
            <h2>Analytics</h2>
            <div className="radarChartContainer">
                <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 150]} />
                        {radarKeys.map((key, index) => (
                            <Radar
                                key={key}
                                name={key}
                                dataKey={key}
                                stroke={colors[index % colors.length]}
                                fill={colors[index % colors.length]}
                                fillOpacity={0.6}
                            />
                        ))}
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const ProfilePage = () => {
    const [selectedTopic, setSelectedTopic] = useState("Topic 1");

    const completionPercentage = 90;
    const nextTargetTopic = "Basic Theory";
    const nextTargetStage = "Beginner";
    const username = "John Doe";

    const topicProgress = [
        { topic: "Topic 1", beginner: 0.6, intermediate: 0.4, advanced: 0.2 },
        { topic: "Topic 2", beginner: 0.5, intermediate: 0.4, advanced: 0.6 },
    ];

    const radarData = [
        { subject: 'Skill', A: 80, B: 110, fullMark: 150 },
        { subject: 'Potential', A: 98, B: 130, fullMark: 150 },
        { subject: 'Contribution', A: 86, B: 130, fullMark: 150 },
        { subject: 'Creativity', A: 99, B: 100, fullMark: 150 },
        { subject: 'Creativity', A: 99, B: 100, fullMark: 150 },
        { subject: 'Creativity', A: 99, B: 100, fullMark: 150 },
    ];

    const radarKeys = ["A", "B"];

    const badges = [
        { icon: "🐾", label: "PAW MASTER" },
        { icon: "🐾", label: "PAW MASTER" },
        { icon: "🐾", label: "PAW MASTER" },
        { icon: "🐾", label: "PAW MASTER" },
    ];

    return (
        <>
            <HomeNavbar/>

            <div className="mainGrid">
                <div className="leftPanel">
                    <ProgressSection completionPercentage={completionPercentage} />
                    <NextTargetSection topic={nextTargetTopic} stage={nextTargetStage} />
                </div>

                <TopicProgressCard
                    topicProgress={topicProgress}
                    selectedTopic={selectedTopic}
                    setSelectedTopic={setSelectedTopic}
                />
            </div>

            <div className="bottomSection">
                <BadgesSection badges={badges} />
                <AnalyticsSection radarData={radarData} radarKeys={radarKeys} />
            </div>
        </>
    );
};

export default ProfilePage;
