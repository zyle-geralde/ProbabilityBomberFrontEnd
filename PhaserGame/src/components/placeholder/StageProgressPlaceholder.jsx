// StageProgressPlaceholder.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList  } from "@fortawesome/free-solid-svg-icons";

export default function StageProgressPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl border border-gray-200">
      <FontAwesomeIcon icon={faList } size="6x" className="text-gray-400 mb-4" />
      <p className="text-gray-500 text-center text-lg">
        No stage progress yet.<br />
        Complete some stages to see your progress!
      </p>
    </div>
  );
}
