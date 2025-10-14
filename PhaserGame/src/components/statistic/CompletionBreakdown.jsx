import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

export default function LessonAnalytics({ stages }) {
  // Fallback
  if (!stages || !stages.length) {
    return (
      <div className="text-gray-500 text-sm italic p-4">
        No analytics data available.
      </div>
    );
  }

  // Prepare data for Score Trend (average score by date)
  const scoreTrend = useMemo(() => {
    const map = new Map();

    for (const s of stages) {
      console.log(s.createdAt)
      const dateObj = new Date(s.createdAt._seconds * 1000 + s.createdAt._nanoseconds / 1e6);

      if (isNaN(dateObj)) continue;

      const date = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const score = Number(s.score) || 0;

      if (!map.has(date)) {
        map.set(date, { date, totalScore: 0, count: 0 });
      }

      const entry = map.get(date);
      entry.totalScore += score;
      entry.count += 1;
      map.set(date, entry);
    }

    return Array.from(map.values())
      .map((v) => ({
        date: v.date,
        avgScore: +(v.totalScore / v.count).toFixed(2),
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [stages]);

  // Prepare data for Stars per Stage (highest stars achieved)
  const starsPerStage = useMemo(() => {
    const map = new Map();

    for (const s of stages) {
      const stageNum = Number(s.stageNumber) || 0;
      const stars = Number(s.numberOfStars) || 0;

      if (!map.has(stageNum)) {
        map.set(stageNum, { stage: stageNum, stars: 0 });
      }

      const entry = map.get(stageNum);
      entry.stars = Math.max(entry.stars, stars);
      map.set(stageNum, entry);
    }

    return Array.from(map.values()).sort((a, b) => a.stage - b.stage);
  }, [stages]);

  console.log("scoreTrend")
  console.log(scoreTrend)

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-4">
      {/* Score Trend */}
      <div className="bg-white p-4 rounded-2xl shadow-sm">
        <h3 className="font-medium mb-2">Score Trend (by date)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoreTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="avgScore"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stars per Stage */}
      <div className="bg-white p-4 rounded-2xl shadow-sm">
        <h3 className="font-medium mb-2">Stars per Stage</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={starsPerStage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="stars" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
