import React from 'react';
import './LevelSelector.css';
import LevelCard from './LevelCard';

function LevelSelector({lessons}) {

    return (
        <div className="level-selector-container">
            {lessons.quizzes[0].levels.map((level, index) => (
                <LevelCard
                    key={index}
                    title={level.name}
                    timeStarted={level.time}
                    timeFinished={level.time}
                    score={level.score}
                    avgScore={level.score}
                    avgTimeFinished={level.time}
                />
            ))
            }
        </div>
    );
}

export default LevelSelector;
