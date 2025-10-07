import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function LeaderboardError() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-gray-200">
      <div className="w-full h-full max-w-sm px-6 py-12 bg-gray-50 border border-gray-200 rounded-lg flex flex-col items-center justify-center">
        <FontAwesomeIcon icon={faExclamationTriangle} size="6x" className="text-gray-400 mb-4" />
        <p className="text-gray-500 text-center text-lg">
          Error loading leaderboard.<br />
          Please reload the page later.
        </p>
      </div>
    </div>
  );
}