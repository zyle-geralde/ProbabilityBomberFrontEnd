import React from 'react';
import './LevelSelector.css';
import LevelCard from './LevelCard';

function LevelSelector() {
    return (
        <div className="level-selector-container">
            <LevelCard 
                title = 'Level 1'
                timeStarted = '-'
                timeFinished = '-' 
                score = '-'
            />
            <LevelCard 
                title = 'Level 2'
                timeStarted = '-'
                timeFinished = '-' 
                score = '-'
            />
            <LevelCard 
                title = 'Level 3'
                timeStarted = '-'
                timeFinished = '-' 
                score = '-'
            />
        </div>
    );
}

export default LevelSelector;