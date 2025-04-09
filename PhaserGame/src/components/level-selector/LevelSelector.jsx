import React, { useState } from 'react';
import './LevelSelector.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import LevelContent from './LevelContent'; // Import the generic component

function BeginnerLevelSelector() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleStartClick = () => {
    alert('Start button clicked!');
  };

  return (
    <div className="lesson-container">
      <div className="lesson-header">
        <span>Stage 1</span>
        <h1>Beginner Fundamentals</h1>
      </div>
      <div className={`topic-container ${isExpanded ? 'active' : ''}`}>
        <div className="topic-info" onClick={toggleExpand}>
          <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} className="dropdown-icon" />
          <div className="topic-title">
            <span>Topic 1</span>
            <h2>Bayes Theorem</h2>
          </div>
        </div>
        <div className={`topic-content-container ${isExpanded ? 'expanded' : ''}`}>
          {isExpanded && (
            <div className="topic-content-header">
              <FontAwesomeIcon icon={faFileAlt} className="topic-content-icon" />
              <a href="#"><span>Topic Content</span></a>
            </div>
          )}

          <LevelContent
            isExpanded={isExpanded}
            topicName="Activity 1"
            status="incomplete"
            score=""
            startTime=""
            finishTime=""
            onStart={handleStartClick}
          />

          <LevelContent
            isExpanded={isExpanded}
            topicName="Activity 2"
            status="incomplete"
            score=""
            startTime=""
            finishTime=""
            onStart={handleStartClick}
          />

          <LevelContent
            isExpanded={isExpanded}
            topicName="Activity 3"
            status="incomplete"
            score=""
            startTime=""
            finishTime=""
            onStart={handleStartClick}
          />
        </div>
      </div>
    </div>
  );
}

export default BeginnerLevelSelector;