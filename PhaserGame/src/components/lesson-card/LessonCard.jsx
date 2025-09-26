import React from "react";

function LessonCard({ image, title, description }) {
  return (
    <div className="lesson-card w-90 min-h-[322px] rounded-2xl overflow-hidden shadow-lg bg-white flex-none">
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
    </div>
  );
}

export default LessonCard;