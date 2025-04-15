import React from 'react';
import './LeaderboardUser.css';

function LeaderboardUser({ rank, name, score, time }) {
  const getRankDisplay = (rank) => {
    if (rank <= 3) {
      return <span className={`rank-${rank}`}>{rank}</span>;
    } else {
      return <span>{rank}th</span>;
    }
  };

  return (
    <li className="leaderboard-item leaderboard-user"> 
    <div className='user-rank-div'>
        <div className="rank-container">
        {getRankDisplay(rank)}
      </div>
      <div className="user-info">
        <span className="name">{name}</span>
      </div>
    </div>
    <div className='score-time-div'>
      <span className="score">{score}</span>
      <span className="time">{time}</span>
    </div>
    </li>
  );
}

export default LeaderboardUser;