import React, { useState, useEffect } from "react";
import { getAUserStageInformation } from "../../hooks/UseStageInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

export default function Achievements() {
  const [userStageInfo, setUserStageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAchievement, setSelectedAchievement] = useState(null);


  /**
   * Helper function to determine if a stage has been completed based on the current data state.
   * @param {number} stageNum - The stage number to check.
   * @returns {boolean} True if the stage is found in the user's data.
   */
  const hasCompletedStage = (stageNum) => {
    // Safely access the array, whether it's wrapped or the data itself
    const dataArray = userStageInfo?.userStageData || userStageInfo;

    if (!Array.isArray(dataArray)) {
      return false;
    }

    // Check if ANY entry for the given stage has a numberOfStars >= 2
    return dataArray.some(entry => 
      entry.stageNumber === stageNum && entry.numberOfStars >= 2
    );
  };

    // --- Helper: Check stars and duration ---
  const hasThreeStars = (stageNum) => {
    // Safely access the array, whether it's wrapped or the data itself
    const dataArray = userStageInfo?.userStageData || userStageInfo;

    if (!Array.isArray(dataArray)) {
      return false;
    }

    const data = dataArray.find(entry => entry.stageNumber === stageNum);
    return data && data.numberOfStars === 3;
  };

  const isSpeedRunner = (stageNum, timeLimit = 600) => {
    const dataArray = userStageInfo?.userStageData || userStageInfo;

    if (!Array.isArray(dataArray)) {
      return false;
    }
    const data = dataArray.find(entry => entry.stageNumber === stageNum);
    return data && data.duration <= timeLimit && data.numberOfStars >= 2;
  };

  useEffect(() => {
    const fetchUserAchievements = async () => {
      try {
        setLoading(true);
        const data = await getAUserStageInformation();
        
        //Corrected: Storing the data fetched
        //setUserStageInfo(data);

      
        
        setUserStageInfo(data);
      } catch (error) {
        console.error("Failed to fetch user stage information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAchievements();
  }, []); // Run only on mount

  //Achievement Definitions

  const flawlessStage1 = hasThreeStars(1);
  const flawlessStage2 = hasThreeStars(2);
  const flawlessStage3 = hasThreeStars(3);

  const stage1Achieved = hasCompletedStage(1);
  const stage2Achieved = hasCompletedStage(2);
  const stage3Achieved = hasCompletedStage(3);

  const speedStage1 = isSpeedRunner(1);
  const speedStage2 = isSpeedRunner(2);
  const speedStage3 = isSpeedRunner(3);

  // Array to hold all achievements for easy mapping
  const achievements = [
    //Flawless (3 stars)
    {
      name: "Probabilistic Prodigy",
      description: "Achieve 3 Stars in Basic Probability.",
      achieved: flawlessStage1,
      src: "/images/flawlessS1.png",
      key: "flawless1"
    },
    {
      name: "Event Expert",
      description: "Achieve 3 Stars in Mutually and Non-Mutually Exclusive Events.",
      achieved: flawlessStage2,
      src: "/images/flawlessS2.png",
      key: "flawless2"
    },
    {
      name: "Dependable Genius",
      description: "Achieve 3 Stars in Dependent and Independent Events.",
      achieved: flawlessStage3,
      src: "/images/flawlessS3.png",
      key: "flawless3"
    },
    { 
      name: "Complete Stage 1",
      description: "Completed stage 1 with atleast 2 stars",
      achieved: stage1Achieved, 
      src: "/images/completeS1.png",
      key: 'stage1'
    },
    { 
      name: "Complete Stage 2", 
      description: "Completed stage 2 with atleast 2 stars",
      achieved: stage2Achieved, 
      src: "/images/completeS2.png",
      key: 'stage2'
    },
    { 
      name: "Complete Stage 3", 
      description: "Completed stage 3 with atleast 2 stars",
      achieved: stage3Achieved, 
      src: "/images/completeS3.png",
      key: 'stage3'
    },
    {
      name: "Quick Thinker",
      description: "Complete Basic Probability in under 10 minutes.",
      achieved: speedStage1,
      src: "/images/speedS1.png",
      key: "speed1"
    },
    {
      name: "Rapid Reasoner",
      description: "Complete Mutually and Non-Mutually Exclusive Events in under 10 minutes.",
      achieved: speedStage2,
      src: "/images/speedS2.png",
      key: "speed2"
    },
    {
      name: "Speed of Certainty",
      description: "Complete Dependent and Independent Events in under 10 minutes.",
      achieved: speedStage3,
      src: "/images/speedS3.png",
      key: "speed3"
    }
  ];

  //Handle Loading and Error States
  if (loading) {
    return (
  <div className="flex items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-xl shadow-lg animate-pulse">
    <svg 
      className="w-6 h-6 mr-3 text-indigo-500 animate-spin" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      ></circle>
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <p className="text-lg font-semibold text-gray-700">
      Loading achievements...
    </p>
  </div>
);
  }
  
  if (!userStageInfo && !loading) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center h-fit text-center">
          <FontAwesomeIcon
            icon={faTrophy}
            size="4x"
            className="w-16 h-16 text-gray-400 mb-2"
          />
          <div className="text-gray-600 text-m italic">
            Check out the stages first!
          </div>
        </div>
      </div>
    );
  }

  
  // Filter for only ACHIEVED items
  const achievedBadges = achievements.filter(a => a.achieved);

  // If no achievements are completed (other than the hardcoded tutorial)
  if (achievedBadges.length === 0) {
          return (
      <div>
        <div className="flex flex-col items-center justify-center h-fit text-center">
          <FontAwesomeIcon
            icon={faTrophy}
            size="4x"
            className="w-16 h-16 text-yellow-400 mb-2"
          />
          <div className="text-gray-600 text-m italic">
            Keep playing to unlock your first achievement!
          </div>
        </div>
      </div>
    );
  }
  
  //Render the ACHIEVED Badges
return (
  <div className="flex flex-wrap justify-around gap-6 p-4">
    {achievedBadges.map((achievement) => {
      const isSelected = selectedAchievement === achievement.key;

      return (
        <div
          key={achievement.key}
          className="relative flex flex-col items-center transform transition duration-300 hover:-translate-y-2 hover:scale-110 cursor-pointer"
          onClick={() =>
            setSelectedAchievement(isSelected ? null : achievement.key)
          }
        >
          {/* Badge Image */}
          <img
            src={achievement.src}
            alt={achievement.name}
            className="w-20 h-auto"
          />

          {/* Badge Name */}
          <p className="mt-2 font-semibold text-gray-800 text-center">
            {achievement.name}
          </p>

          {/* Description (visible when clicked) */}
          {isSelected && (
            <div className="absolute top-full mt-3 w-56 bg-gray-800 text-white text-sm rounded-lg px-3 py-2 shadow-lg text-center z-10">
              {achievement.description}
              <div className="absolute left-1/2 -top-2 -translate-x-1/2 border-8 border-transparent border-b-gray-800"></div>
            </div>
          )}
        </div>
      );
    })}
  </div>
);

}