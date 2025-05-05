import React from 'react';
import './Leaderboard.css'; // Assuming you save your CSS there

// Modify the players array to have less than 10 entries
const players = [
  { rank: 1, name: 'Lee Taeyong', points: 258.244 },
  { rank: 2, name: 'Mark Lee', points: 258.242 },
  { rank: 3, name: 'Xiao Dejun', points: 258.223 },
  { rank: 4, name: 'Qian Kun', points: 258.212 },
  { rank: 5, name: 'Johnny Suh', points: 258.208 },
];

// Fill the remaining places up to 10 with placeholders
const totalRanks = 10;
const paddedPlayers = [
  ...players,
  ...Array.from({ length: totalRanks - players.length }).map(() => ({
    rank: '',
    name: '',
    points: '',
  })),
];

const Leaderboard = () => {
  return (
    <main>
      <div id="header">
        <h1>Leaderboard</h1>
      </div>
      <div id="leaderboard">
        <div className="ribbon"></div>
        <table>
          <tbody>
            {paddedPlayers.map((player, index) => (
              <tr key={index} className={player.rank === 1 ? 'top-player' : ''}>
                <td className="number">{player.rank || index + 1}</td>
                <td className="name">{player.name || 'N/A'}</td>
                <td className="points">{player.points ? player.points.toFixed(3) : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Leaderboard;
