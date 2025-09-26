import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";

function LessonCard({ stage, image, title, description }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (stage) {
      navigate(stage);
    } else {
      setShowModal(true);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="lesson-card w-90 min-h-[322px] rounded-2xl overflow-hidden shadow-lg bg-white flex-none cursor-pointer hover:shadow-xl transition-shadow"
    >
      {/* Image */}
      <div className="lesson-image h-28 bg-blue-200">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="lesson-description p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          {title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowModal(false)} // Close when clicking backdrop
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()} // Prevent bubbling to parent
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Lesson Unavailable
            </h3>

            <p className="text-gray-600 mb-6">
              This lesson is not available yet. Please check back later.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


export default LessonCard;