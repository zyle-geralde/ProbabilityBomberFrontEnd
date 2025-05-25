import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({studentLeaderBoards}) => {
  const players = []; // Add players here as needed
  const totalRanks = 10;

  const paddedPlayers = studentLeaderBoards

  return (
    <>
      <div className="leaderboard-header">
        <h1>Leaderboard</h1>
      </div>

      <div className="leaderboard-wrapper">
        <div className="ribbon"></div>
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th className="leaderboard-th-rank">Rank</th>
              <th className="leaderboard-th-name">Name</th>
              <th className="leaderboard-th-time">Time</th>
              <th className="leaderboard-th-attempt">Attempt</th>
              <th className="leaderboard-th-score">Score</th>
            </tr>
          </thead>
          <tbody>
            {paddedPlayers.map((player, index) => {
              const isTopPlayer = player.rank === 1;
              return (
                <tr key={index} className={isTopPlayer ? 'top-player' : ''}>
                  <td className="leaderboard-number">{index + 1}</td>
                  <td className="leaderboard-name">{player.name}</td>
                  <td className="leaderboard-points">
                    {player.timeCompletion}
                  </td>
                  <td className="leaderboard-points">
                    {player.noAttempts}
                  </td>
                  <td className="leaderboard-points">
                    {player.score}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Leaderboard;
