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
        name: 'Beginner', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Quiz1',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson1/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Quiz2',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson1/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Quiz3',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson1/level3',
            createdBy: '0'  
          }
        ]
      },
{ 
        id: 'lesson1-quiz2', 
        name: 'Intermediate', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Quiz1',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson1/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Quiz2',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson1/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Quiz3',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson1/level3',
            createdBy: '0'  
          }
        ]
      },
{ 
        id: 'lesson1-quiz3', 
        name: 'Advance', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Quiz1',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson1/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Quiz2',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson1/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Quiz3',
            time:'10',
            score: '10',
            takes:"1",
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
        name: 'Beginner', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Q1',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson2/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Q2',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson2/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Q3',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson2/level3',
            createdBy: '0'  
          }
        ]
      },
      { 
        id: 'lesson2-quiz2', 
        name: 'Intermediate', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Q1',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson2/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Q2',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson2/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Q3',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson2/level3',
            createdBy: '0'  
          }
        ]
      },
      { 
        id: 'lesson2-quiz3', 
        name: 'Advance', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Q1',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson2/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Q2',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson2/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Q3',
            time:'10',
            score: '10',
            takes:"1",
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
        name: 'Beginner', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Q1',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson3/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Q2',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson3/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Q3',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson3/level3',
            createdBy: '0'  
          }
        ]
      },
      { 
        id: 'lesson3-quiz2', 
        name: 'Intermediate', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Q1',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson3/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Q2',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson3/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Q3',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson3/level3',
            createdBy: '0'  
          }
        ]
      },
      { 
        id: 'lesson3-quiz3', 
        name: 'Advance', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Q1',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson3/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Q2',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson3/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Q3',
            time:'10',
            score: '10',
            takes:"1",
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
        name: 'Beginner', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Q1',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson4/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Q2',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson4/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Q3',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson4/level3',
            createdBy: '0'  
          }
        ]
      },
      { 
        id: 'lesson4-quiz2', 
        name: 'Intermediate', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Q1',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson4/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Q2',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson4/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Q3',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson4/level3',
            createdBy: '0'  
          }
        ]
      },
      { 
        id: 'lesson4-quiz3', 
        name: 'Advance', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Q1',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson4/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Q2',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson4/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Q3',
            time:'10',
            score: '10',
            takes:"1",
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
        name: 'Beginner', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Q1',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson5/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Q2',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson5/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Q3',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson5/level3',
            createdBy: '0'  
          }
        ]
      },
{ 
        id: 'lesson5-quiz2', 
        name: 'Intermediate', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Q1',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson5/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Q2',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson5/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Q3',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson5/level3',
            createdBy: '0'  
          }
        ]
      },
{ 
        id: 'lesson5-quiz3', 
        name: 'Advance', 
        levelsCompleted: 0,
        levels: [
          {
            levelId: 'level1',
            name: 'Q1',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson5/level1',
            createdBy: '0'  
          },
          {
            levelId: 'level2',
            name: 'Q2',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson5/level2',
            createdBy: '0'  
          },
          {
            levelId: 'level3',
            name: 'Q3',
            time:'10',
            score: '10',
            takes:"1",
            gameLink: '/game/lesson5/level3',
            createdBy: '0'  
          }
        ]
      },
    ],
  },
];



function ListOfLessons({ userData, title }) {

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