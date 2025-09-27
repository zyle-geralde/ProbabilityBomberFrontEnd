import React from "react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, Tooltip
} from "recharts";

export default function CompletionBreakdown({ stages }) {
  // Transform stages into radar chart data
  const data = stages.map((stage) => ({
    stage: stage.title,
    score: stage.score || 0,
    duration: stage.durationMinutes || 0,
  }));

  return (
    <div className="p-2">
      <div className="flex justify-center items-center h-fit">
        <RadarChart
          cx={210}
          cy={180}
          outerRadius={80}
          width={420}
          height={360}
          data={data}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="stage"  tick={{ fontSize: 10 }}  angle={-30} />
          <PolarRadiusAxis />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#641B2E"
            fill="#641B2E"
            fillOpacity={0.6}
          />
          <Radar
            name="Duration"
            dataKey="duration"
            stroke="#FFB74D"
            fill="#FFB74D"
            fillOpacity={0.4}
          />
          <Legend />
          <Tooltip />
        </RadarChart>
      </div>
    </div>
  );
}
