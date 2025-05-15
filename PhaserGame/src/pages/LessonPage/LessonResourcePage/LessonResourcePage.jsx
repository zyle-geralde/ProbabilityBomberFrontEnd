import React from 'react';
import {faArrowLeftToBracket} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function LessonResourcePage() {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-back-container">

                <div className="navbar-back-icon">
                    <FontAwesomeIcon icon={faArrowLeftToBracket} />
                </div>

                <div className='navbar-back-lesson-title'>
                    Lesson 1
                </div>
                </div>
            </nav>
            <div className='lesson-resource-container'>
                
            </div>
        </>

    );
}

export default LessonResourcePage;