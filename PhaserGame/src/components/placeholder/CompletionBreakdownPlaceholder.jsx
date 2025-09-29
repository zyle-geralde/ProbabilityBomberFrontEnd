// CompletionBreakdownPlaceholder.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";

export default function CompletionBreakdownPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl border border-gray-200">
      <FontAwesomeIcon icon={faChartPie} size="6x" className="text-gray-400 mb-4" />
      <p className="text-gray-500 text-center text-lg">
        No stage data yet.<br />
        Complete some stages to see your progress!
      </p>
    </div>
  );
}
