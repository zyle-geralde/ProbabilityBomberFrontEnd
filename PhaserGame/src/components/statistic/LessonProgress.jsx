import React, { useMemo } from "react";

export default function LessonProgress({ stages }) {
  // Fallback if no data
  if (!stages || !stages.length) {
    return (
      <div className="text-gray-500 text-sm italic p-4">
        No stage data available.
      </div>
    );
  }

  // Aggregate by stage using highest numberOfStars among attempts
  const byStage = useMemo(() => {
    const map = new Map();

    for (const s of stages) {
      const stageNum = Number(s.stageNumber) || 0;
      const stars = Number(s.numberOfStars) || 0;
      const score = Number(s.score) || 0;
      const duration = Number(s.durationMinutes || s.duration || 0);

      if (!map.has(stageNum)) {
        map.set(stageNum, {
          stage: stageNum,
          attempts: 0,
          highestStars: 0,
          totalScore: 0,
          totalDuration: 0,
        });
      }

      const entry = map.get(stageNum);
      entry.attempts += 1;
      entry.highestStars = Math.max(entry.highestStars, stars);
      entry.totalScore += score;
      entry.totalDuration += duration;
      map.set(stageNum, entry);
    }

    return Array.from(map.values())
      .map((v) => ({
        ...v,
        avgScore: +(v.totalScore / v.attempts).toFixed(2),
        avgDuration: +(v.totalDuration / v.attempts).toFixed(2),
        progress:
          v.highestStars >= 3
            ? 100
            : v.highestStars === 2
            ? 66
            : v.highestStars === 1
            ? 33
            : 0,
      }))
      .sort((a, b) => a.stage - b.stage);
  }, [stages]);

  const renderStars = (count) => {
    const totalStars = 3;
    return Array.from({ length: totalStars }, (_, i) => (
      <span key={i} className={i < count ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  return (
    <section className="bg-white p-4 rounded-2xl shadow-sm">
      <h2 className="font-medium text-lg">Stage-by-stage Breakdown</h2>
      <div className="mt-4 space-y-3">
        {byStage.length ? (
          byStage.map((s) => (
            <div
              key={s.stage}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div>
                <div className="text-sm font-semibold flex items-center gap-2">
                  Stage {s.stage}
                  <div className="flex">{renderStars(s.highestStars)}</div>
                </div>
                <div className="text-xs text-gray-500">
                  Attempts: {s.attempts} • Highest Stars: {s.highestStars} • Avg
                  Score: {s.avgScore}
                </div>
              </div>
              <div className="w-1/3">
                <div className="text-xs text-gray-500 mb-1">
                  Progress (by stars)
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    style={{ width: `${s.progress}%` }}
                    className="h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">No stage data available.</div>
        )}
      </div>
    </section>
  );
}
