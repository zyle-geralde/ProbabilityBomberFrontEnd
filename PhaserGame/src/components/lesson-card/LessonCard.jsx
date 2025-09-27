import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LessonCard({ stageLink, stageNo, image, title, description }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (stageLink) {
      navigate(stageLink);
    } else {
      setShowModal(true);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="lesson-card w-80 h-[380px] rounded-2xl overflow-hidden shadow-lg bg-white flex-none cursor-pointer 
                 transform transition-transform duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Image */}
      <div className="lesson-image h-40 bg-blue-200">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="lesson-description p-4 flex flex-col ">
        {stageNo !== "0" ? (
          <span className="text-gray-500 text-md font-light">Stage - {stageNo}</span>
        ) : (
          <span className="block h-5"></span>
        )}

        <h2 className="!text-lg font-semibold text-gray-800 mb-2">{title}</h2>

        <p
          className="text-gray-600 text-sm leading-relaxed overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3, // max number of lines before ellipsis
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </p>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
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
