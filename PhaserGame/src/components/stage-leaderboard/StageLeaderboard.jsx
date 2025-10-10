import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { useGetSpecificStageInfo } from "../../hooks/UseStageInfo";
import LeaderboardError from "../placeholder/LeaderboardErrorPlaceholder";
import LeaderboardLoading from "../placeholder/LeaderboardLoadingPlaceholder";
import LeaderboardPlaceholder from "../placeholder/LeaderboardPlaceholder";

// const students = [
//   { name: "Ava Johnson", score: 95, duration: 125 }, 
//   { name: "Liam Carter", score: 88, duration: 12222240 },
//   { name: "Sophia Nguyen", score: 92, duration: 100 },
//   { name: "Ethan Rodriguez", score: 85, duration: 155 },
//   { name: "Olivia Patel", score: 90, duration: 132 },
//   { name: "Noah Kim", score: 87, duration: 160 },
//   { name: "Isabella Smith", score: 91, duration: 110 },
// ];

function StageLeaderboard({ stageNumber }) {
    const { stageInfo, loading, error } = useGetSpecificStageInfo(stageNumber);
    console.log("Leaderboard students:", stageInfo);


    function formatDuration(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    }

    function getCircleStyle(rank) {
        if (rank === 0) return "bg-yellow-400 text-white"; // gold
        if (rank === 1) return "bg-gray-400 text-white";   // silver
        if (rank === 2) return "bg-amber-700 text-white";  // bronze
        return "bg-gray-200 text-gray-700";                // others
    }


    if (loading) return <LeaderboardLoading />;
    if (error) return <LeaderboardError />;
    if (stageInfo.length <= 0) return <LeaderboardPlaceholder />;

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 max-w-sm mx-auto">
            <div className="flex flex-col mb-2">
                <h2 className="text-center !text-4xl !font-bold text-gray-900">
                    Leaderboard
                </h2>
            </div>

            <ul className="space-y-3 flex flex-col items-center p-0 w-full max-h-100 overflow-y-auto">
                {stageInfo
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 10)
                    .map((student, i) => (
                        <li
                            key={i}
                            className={`flex items-center w-full justify-between p-3 rounded-xl ${i === 0 ? "bg-yellow-50 border border-yellow-200" : "bg-gray-50"
                                }`}
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div
                                    className={`w-10 h-10 flex flex-col items-center justify-center rounded-full font-semibold text-xs ${getCircleStyle(
                                        i
                                    )}`}
                                >
                                    {i <= 2 ? (
                                        <>
                                            <FontAwesomeIcon icon={faCrown} className="text-xs mb-0.5" />
                                            <span>{i + 1}</span>
                                        </>
                                    ) : (
                                        <span className="text-sm">{i + 1}</span>
                                    )}
                                </div>

                                {/* Username */}
                                <span
                                    className="font-medium text-gray-800 truncate max-w-[120px]"
                                    title={student.username}
                                >
                                    {student.username}
                                </span>
                            </div>

                            {/* Score & Duration */}
                            <div className="flex flex-col text-right text-sm whitespace-nowrap min-w-[70px]">
                                <span className="font-semibold text-gray-800 overflow-hidden text-ellipsis">
                                    {student.score} pts
                                </span>
                                <span className="text-gray-500 overflow-hidden text-ellipsis">
                                    {formatDuration(student.duration)} min
                                </span>
                            </div>
                        </li>

                    ))}
            </ul>
        </div>
    );
}

export default StageLeaderboard;
