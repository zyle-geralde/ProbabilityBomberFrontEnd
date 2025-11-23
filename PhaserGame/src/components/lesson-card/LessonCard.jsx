import React from "react";
import { useNavigate } from "react-router-dom";

function LessonCard({ stageLink, stageNo, image, title, description, isLocked }) {
  const navigate = useNavigate();

  const handleClick = (e) => {

    /*if (isLocked) {
      e.preventDefault();

      console.log(`Stage ${stageNo} is locked. Complete Stage ${stageNo - 1} first.`);
      return;
    }*/


    if (stageLink) {
      navigate(stageLink);
    } 
  };


  const cardBaseClasses = "lesson-card w-80 h-[380px] rounded-2xl overflow-hidden shadow-lg bg-white flex-none transition-all duration-300 relative";
  
  const cardDynamicClasses = isLocked
    ? "opacity-50 cursor-not-allowed" 
    : "cursor-pointer transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"; 
    
  const cardClassName = `${cardBaseClasses} ${cardDynamicClasses}`;


  return (
    <div
      onClick={handleClick}
     
      role="link"
      aria-disabled={isLocked}
      className={cardClassName}
    >
      {/* Image */}
      <div className="lesson-image h-40 bg-blue-200">
        <img 
          src={image} 
          alt={title} 
          
          className={`w-full h-full object-cover ${isLocked ? 'grayscale' : ''}`} 
        />
      </div>

      {/* Content */}
      <div className="lesson-description p-4 flex flex-col ">
        {stageNo !== "0" ? (
          <span className="text-gray-500 text-md font-light">Stage - {stageNo}</span>
        ) : (
          <span className="block h-5"></span>
        )}

        {/* Title text is also faded via the parent opacity */}
        <h2 className="!text-lg font-semibold text-gray-800 mb-2">{title}</h2>

        <p
          className="text-gray-600 text-sm leading-relaxed overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3, 
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </p>
      </div>

      {/* Removed all modal/popup rendering logic */}
    </div>
  );
}

export default LessonCard;