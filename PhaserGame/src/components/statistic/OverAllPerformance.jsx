import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";

export default function OverAllPerformance({ stages }) {
  // Fallback if no data yet
  if (!stages || !stages.length) {
    return (
      <div>
        <div className="flex flex-col items-center justify-center h-fit text-center">
          <FontAwesomeIcon
            icon={faChartSimple}
            size="4x"
            className="w-16 h-16 text-gray-400 mb-2"
          />
          <div className="text-gray-500 text-sm italic">
            No stage data available yet.
          </div>
        </div>
      </div>
    );
  }

  // Compute overall metrics
  const stats = useMemo(() => {
    const totalScore = stages.reduce((sum, s) => sum + (s.score || 0), 0);
    const totalStars = stages.reduce((sum, s) => sum + (s.numberOfStars || 0), 0);
    const totalDuration = stages.reduce((sum, s) => sum + (s.duration || 0), 0);
    const attempts = stages.length;
    const scores = stages.map((s) => s.score || 0);

    return {
      avgScore: +(totalScore / attempts).toFixed(2),
      maxScore: Math.max(...scores),
      minScore: Math.min(...scores),
      totalStars,
      avgDuration: +((totalDuration / attempts) / 60).toFixed(2), // convert seconds → minutes
      attempts,
    };
  }, [stages]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Overall Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-800">
        <div className="p-4 rounded-lg bg-gray-50 text-center">
          <div className="text-sm text-gray-500">Average Score</div>
          <div className="text-3xl font-semibold text-[#641B2E]">{stats.avgScore}</div>
          <div className="text-xs text-gray-500">Across {stats.attempts} Attempts</div>
        </div>
        <div className="p-4 rounded-lg bg-gray-50 text-center">
          <div className="text-sm text-gray-500">Highest Score</div>
          <div className="text-3xl font-semibold text-green-600">{stats.maxScore}</div>
        </div>
        <div className="p-4 rounded-lg bg-gray-50 text-center">
          <div className="text-sm text-gray-500">Lowest Score</div>
          <div className="text-3xl font-semibold text-red-500">{stats.minScore}</div>
        </div>
        <div className="p-4 rounded-lg bg-gray-50 text-center">
          <div className="text-sm text-gray-500">Total Stars</div>
          <div className="text-3xl font-semibold text-yellow-500">{stats.totalStars}</div>
        </div>
        <div className="p-4 rounded-lg bg-gray-50 text-center">
          <div className="text-sm text-gray-500">Average Duration</div>
          <div className="flex items-end justify-center">
            <span className="text-3xl font-semibold text-blue-600">{stats.avgDuration}</span>
            <span className="text-sm text-gray-400 ml-1 ">min</span>
          </div>
        </div>
      </div>
    </div>
  );
}
