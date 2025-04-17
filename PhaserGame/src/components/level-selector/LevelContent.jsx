import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle as faSolidCircle, faCheck } from '@fortawesome/free-solid-svg-icons'; // Using solid circle

function LevelContent({ isExpanded, topicName, status, score, startTime, finishTime, onStart }) {
  if (!isExpanded) {
    return null;
  }

  const getStatusIcon = (currentStatus) => {
    if (currentStatus === 'completed') {
      return (
        <div className="status-icon completed-circle">
          <FontAwesomeIcon icon={faSolidCircle} className="circle-border-icon completed-color" />
          <FontAwesomeIcon icon={faCheck} className="check-icon completed-color" />
        </div>
      );
    } else if (currentStatus === 'incomplete') {
      return <FontAwesomeIcon icon={faSolidCircle} className="status-icon incomplete-circle-border" />;
    }
    return null;
  };

  return (
    <div className="topic-content-expanded">
      <div className="activity-summary">
        <div className="activity-title">
          <span>{topicName}</span>
          {getStatusIcon(status)}
        </div>
        {score === 'undefined' && (
          <div className='score-summary'>
            <div>Score:</div>
            <div className="score">{score}</div>
          </div>
        )}

        {startTime && (
          <div className="date-time">
            <span>Date & Time Started</span>
            <span>{startTime}</span>
          </div>
        )}
        {finishTime && (
          <div className="date-time">
            <span>Date & Time Finished</span>
            <span>{finishTime}</span>
          </div>
        )}
        {onStart && (
          <button className="start-button" onClick={onStart}>Start</button>
        )}
      </div>
    </div>
  );
}

export default LevelContent;