import React from 'react';
import './LevelSelector.css';
import LevelCard from './LevelCard';

function LevelSelector() {
    const levels = [
        {
            title: 'Beginner',
            timeStarted: '2025-05-06 09:00',
            timeFinished: '2025-05-06 09:30',
            score: 85,
            avgScore: 80,
            avgTimeFinished: '00:25:00',
        },
        {
            title: 'Intermediate',
            timeStarted: '2025-05-07 10:00',
            timeFinished: '2025-05-07 10:20',
            score: 90,
            avgScore: 82,
            avgTimeFinished: '00:22:00',
        },
        {
            title: 'Expert',
            timeStarted: '2025-05-08 11:00',
            timeFinished: '2025-05-08 11:40',
            score: 75,
            avgScore: 78,
            avgTimeFinished: '00:30:00',
        }
    ];

    return (
        <div className="level-selector-container">
            {levels.map((level, index) => (
                <LevelCard
                    key={index}
                    title={level.title}
                    timeStarted={level.timeStarted}
                    timeFinished={level.timeFinished}
                    score={level.score}
                    avgScore={level.avgScore}
                    avgTimeFinished={level.avgTimeFinished}
                />
            ))}
        </div>
    );
}

export default LevelSelector;
