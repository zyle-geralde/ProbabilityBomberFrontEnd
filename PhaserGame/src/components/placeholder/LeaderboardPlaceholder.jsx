import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

export default function LeaderboardPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center p-6  bg-white rounded-xl border border-gray-200">
      <div className="w-full h-full max-w-sm px-6 py-12 bg-gray-50 border border-gray-200 rounded-lg flex flex-col items-center justify-center">
        <FontAwesomeIcon icon={faTrophy} size="6x" className="text-gray-400 mb-4" />
        <p className="text-gray-500 text-center text-lg">
          No leaderboard scores yet.<br />
          Complete the stage to be the first added to the leaderboard!
        </p>
      </div>
    </div>
  );
}
