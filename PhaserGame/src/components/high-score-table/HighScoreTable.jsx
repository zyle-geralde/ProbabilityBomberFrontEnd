import React, { useState } from 'react';
import './HighScoreTable.css';
import LeaderboardUser from './LeaderboardUser';

function HighScoreTable() {
  const leaderboardData = [
    { rank: 1, name: 'Saniel', nickname: 'Mitchel', score: '20/20', time: '00:36' },
    { rank: 2, name: 'Chavez', nickname: 'Francis Benedict', score: '20/20', time: '00:52' },
    { rank: 3, name: 'Lee', nickname: 'Jeretty', score: '20/20', time: '00:54' },
    { rank: 4, name: 'Navarro', nickname: 'Mikhail James', score: '20/20', time: '01:39' },
    { rank: 5, name: 'Abellana', nickname: 'Paul Thomas', score: '20/20', time: '02:42' },
    { rank: 6, name: 'Ejares', nickname: 'Nicole', score: '20/20', time: '04:58' },
    { rank: 7, name: 'Catubig', nickname: 'Nina Margarette', score: '20/20', time: '09:52' },
    { rank: 8, name: 'Pepito', nickname: '', score: '18/20', time: '09:58' },
    // Add more data as needed
  ];

  return (
    <div className="high-score-activity-container">
      <div className="high-score-title">
        <h1>LEADER BOARD</h1>
      </div>
      <div className="activity-header">
        <h2>Bayes Theorem (20 points)</h2>
      </div>
      <div className="leaderboard-header">
          <span className="user-rank">Rank</span> 
          <span className="user-name">Name</span> 
          <span className="total-score">Total Score</span>
          <span className="total-time">Total Time</span>
      </div>
      <ul className="leaderboard-list">
        {leaderboardData.map((entry) => (
          <LeaderboardUser
            key={entry.name}
            rank={entry.rank}
            name={entry.name}
            score={entry.score}
            time={entry.time}
          />
        ))}
      </ul>
    </div>
  );
}


export default HighScoreTable;
