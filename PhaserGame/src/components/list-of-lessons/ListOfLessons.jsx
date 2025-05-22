import React from 'react';
import LessonCard from '../lesson-card/LessonCard';
import { data } from 'react-router-dom';
import { useGetAllQuiz } from '../../hooks/UseQuiz';

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



function ListOfLessons({ userData, title,classId }) {
  const { data: quizzes, loading, error } = useGetAllQuiz();
  console.log(userData)

  if (loading) return <div>Loading</div>
  if (error) return <p>Something went wrong: {error.message}</p>;

  const filteredList = quizzes.allQuizzes.filter(quiz => quiz.classIds[0] == classId)
  console.log(filteredList)


  return (
    <>
      {staticLessons.map((lesson,index) => (
        <LessonCard
          // Use lesson.id as a unique key
          key={index}
          lesson={lesson}
          quizList={filteredList.filter(quiz => quiz.topic === lesson.id.split('lesson')[1])}
          title={title}
          userData={userData}
        />
      ))}
    </>
  );
}
  
export default ListOfLessons;