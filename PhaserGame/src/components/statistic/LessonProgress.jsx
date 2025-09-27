import React from "react";

export default function LessonProgress({ stages }) {
  return (
    <div className="p-4">
      <div className="h-64 overflow-y-auto space-y-3">
        {stages.map((stage, i) => (
          <div
            key={i}
            className="p-4 bg-gray-50 border rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="text-md font-semibold text-gray-800">
                {stage.title}
              </h3>
              <p className="text-sm text-gray-500">Duration: {stage.durationMinutes}</p>
            </div>
            <div>
                <span className="text-3xl font-bold text-[#641B2E]">{stage.score}</span>
                <p className="text-sm text-gray-500">score</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
