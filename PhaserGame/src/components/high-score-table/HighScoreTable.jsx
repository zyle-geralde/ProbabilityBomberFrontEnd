import React, { useState } from 'react';
import './HighScoreTable.css';

function HighScoreTable() {
  const [sortBy, setSortBy] = useState('highScore');

  const highScores = [
    { player: 'Alice', score: 1500, time: 45 },
    { player: 'Bob', score: 1400, time: 38 },
    { player: 'Charlie', score: 1350, time: 42 },
  ];

  const sortedScores = [...highScores].sort((a, b) => {
    if (sortBy === 'highScore') {
      return b.score - a.score;
    } else {
      return a.time - b.time;
    }
  });

  // Create an array with the top 10 scores, filling missing spots with placeholders
  const top10Scores = [
    ...sortedScores,
    ...Array(10 - sortedScores.length).fill({
      player: '-',
      score: '-',
      time: '-',
    }),
  ];

  return (
    <div className="highscore-table-container">
        <div className="highscore-title">TOP HIGH SCORE</div>
        <div className="sort-buttons">
            <button onClick={() => setSortBy('highScore')}>Sort by High Score</button>
            <button onClick={() => setSortBy('fastestTime')}>Sort by Fastest Time</button>
        </div>

        <div className="table-wrapper">
            <table className="highscore-table">
            <thead>
                <tr>
                <th>Player</th>
                <th>Score</th>
                <th>Time (s)</th>
                </tr>
            </thead>
            <tbody>
                {top10Scores.slice(0, 10).map((row, index) => (
                <tr key={index}>
                    <td>{row.player}</td>
                    <td>{row.score}</td>
                    <td>{row.time}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
  );
}

export default HighScoreTable;
