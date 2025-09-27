import React from "react";

export default function Achievements() {
  const tutorialAchieved = true;
  const stage1Achieved = false;
  const stage2Achieved = true;
  const stage3Achieved = false;

  return (
    <div className="flex justify-around p-4">
      {/* Tutorial */}
      <div className="flex flex-col items-center transform transition duration-300 hover:-translate-y-2 hover:scale-110">
        <img
          src="/images/tutorial-badge.png"
          alt="Tutorial"
          className={`w-20 h-auto rounded-full border filter ${tutorialAchieved ? "" : "grayscale"}`}
        />
        <p className={`mt-2 font-semibold ${tutorialAchieved ? "text-gray-800" : "text-gray-400"}`}>
          Complete Tutorial
        </p>
      </div>

      {/* Stage 1 */}
      <div className="flex flex-col items-center transform transition duration-300 hover:-translate-y-2 hover:scale-110">
        <img
          src="/images/stage-1-badge.png"
          alt="Stage 1"
          className={`w-20 h-auto rounded-full border filter ${stage1Achieved ? "" : "grayscale"}`}
        />
        <p className={`mt-2 font-semibold ${stage1Achieved ? "text-gray-800" : "text-gray-400"}`}>
          Complete Stage 1
        </p>
      </div>

      {/* Stage 2 */}
      <div className="flex flex-col items-center transform transition duration-300 hover:-translate-y-2 hover:scale-110">
        <img
          src="/images/stage-2-badge.png"
          alt="Stage 2"
          className={`w-20 h-auto rounded-full border filter ${stage2Achieved ? "" : "grayscale"}`}
        />
        <p className={`mt-2 font-semibold ${stage2Achieved ? "text-gray-800" : "text-gray-400"}`}>
          Complete Stage 2
        </p>
      </div>

      {/* Stage 3 */}
      <div className="flex flex-col items-center transform transition duration-300 hover:-translate-y-2 hover:scale-110">
        <img
          src="/images/stage-3-badge.png"
          alt="Stage 3"
          className={`w-20 h-auto rounded-full border filter ${stage3Achieved ? "" : "grayscale"}`}
        />
        <p className={`mt-2 font-semibold ${stage3Achieved ? "text-gray-800" : "text-gray-400"}`}>
          Complete Stage 3
        </p>
      </div>
    </div>
  );
}
