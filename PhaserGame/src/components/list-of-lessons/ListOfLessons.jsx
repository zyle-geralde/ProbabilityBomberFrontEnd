import React from 'react';
import LessonCard from '../lesson-card/LessonCard';
import { useUserContext } from '../../contexts/UserContext';

const staticLessons = [
  {
    id: 'lesson1',
    title: 'Bayes Theorem',
    resourceLink: '/Bayes Theorem',
    quizzes: [
      { 
        id: 'lesson1-quiz', 
        name: 'Bayes Theorem Quiz', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Beginner',
            dateStarted: '',
            dateEnded: '',
            score: '',
            gameLink: '/game/lesson1/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Intermediate',
            dateStarted: '',
            dateEnded: '',
            score: '',
            gameLink: '/game/lesson1/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Expert',
            dateStarted: '',
            dateEnded: '',
            score: '',
            gameLink: '/game/lesson1/level3',
            createdBy: '0'  
          }
        ]
      },
    ],
  },
  {
    id: 'lesson2',
    title: 'Probability Basics',
    resourceLink: '/Probability Basics',
    quizzes: [
      { 
        id: 'lesson2-quiz', 
        name: 'Probability Basics Quiz', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Beginner',
            dateStarted: '',
            dateEnded: '',
            score: '',
            gameLink: '/game/lesson2/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Intermediate',
            dateStarted: '',
            dateEnded: '',
            score: '',
            gameLink: '/game/lesson2/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Expert',
            dateStarted: '',
            dateEnded: '',
            score: '',
            gameLink: '/game/lesson2/level3',
            createdBy: '0'  
          }
        ]
      },
    ],
  },
  {
    id: 'lesson3',
    title: 'Combinatorics',
    resourceLink: '/Combinatorics',
    quizzes: [
      { 
        id: 'lesson3-quiz', 
        name: 'Combinatorics Quiz', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Beginner',
            dateStarted: '',
            dateEnded: '',
            score: '',
            gameLink: '/game/lesson3/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Intermediate',
            dateStarted: '',
            dateEnded: '',
            score: '',
            gameLink: '/game/lesson3/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Expert',
            dateStarted: '',
            dateEnded: '',
            score: '',
            gameLink: '/game/lesson3/level3',
            createdBy: '0'  
          }
        ]
      },
    ],
  },
  {
    id: 'lesson4',
    title: 'Conditional Probability',
    resourceLink: '/Conditional Probability',
    quizzes: [
      { 
        id: 'lesson4-quiz', 
        name: 'Conditional Probability Quiz', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Beginner',
            dateStarted: '',
            dateEnded: '',
            score: '',
            gameLink: '/game/lesson4/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Intermediate',
            dateStarted: '',
            dateEnded: '',
            score: '',
            gameLink: '/game/lesson4/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Expert',
            dateStarted: '',
            dateEnded: '',
            score: '',
            gameLink: '/game/lesson4/level3',
            createdBy: '0'  
          }
        ]
      },
    ],
  },
  {
    id: 'lesson5',
    title: 'Random Variables',
    resourceLink: '/Random Variables',
    quizzes: [
      { 
        id: 'lesson5-quiz', 
        name: 'Random Variables Quiz', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Beginner',
            dateStarted: '',
            dateEnded: '',
            score: '',
            gameLink: '/game/lesson5/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Intermediate',
            dateStarted: '',
            dateEnded: '',
            score: '',
            gameLink: '/game/lesson5/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Expert',
            dateStarted: '',
            dateEnded: '',
            score: '',
            gameLink: '/game/lesson5/level3',
            createdBy: '0'  
          }
        ]
      },
    ],
  },
];



function ListOfLessons() {
  return (
    <>
      {staticLessons.map((lesson) => (
        <LessonCard
          // Use lesson.id as a unique key
          key={lesson.id} 
          lesson={lesson}
        />
      ))}
    </>
  );
}
  
export default ListOfLessons;