const students = [
  { name: "Ava Johnson", score: 95 },
  { name: "Liam Carter", score: 88 },
  { name: "Sophia Nguyen", score: 92 },
  { name: "Ethan Rodriguez", score: 85 },
  { name: "Olivia Patel", score: 90 },
  { name: "Noah Kim", score: 87 },
  { name: "Isabella Smith", score: 91 }
];

//should also get stage #
function StageLeaderboard({stageNumber}){
    switch(stageNumber){
        case 1:
            console.log("Basic Probability")
            break
        case 2:
            console.log("Independent & Dependent")
            break
        case 3:
            console.log("Bayes Theorem")
            break
        default:
            console.log("Invalid Lesson")
            break
    }

    function processScore(score){
        var minutes = 0
        var seconds = score

        while(seconds > 60){
            minutes++
            seconds = seconds - 60
        }

        return `${minutes}:${seconds}`
    }

    return(
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Leaderboard</h2>
            <ul className="space-y-2 px-2">
                {students.map((student, i) => (
                <li
                    key={i}
                    className={`flex justify-between items-center px-3 py-2 rounded-md ${
                    i === 0
                        ? "bg-yellow-100 font-bold"
                        : i === 1
                        ? "bg-gray-100"
                        : i === 2
                        ? "bg-red-100"
                        : ""
                    }`}
                >
                    <span>
                    {i + 1}. {student.name}
                    </span>
                    <span className="text-sm text-gray-600"> 
                        {processScore(student.score)}
                    </span>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default StageLeaderboard;