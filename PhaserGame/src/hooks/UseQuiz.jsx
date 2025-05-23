import { useEffect, useState } from "react";
import * as QuizController from "../controllers/QuizControllerTemp"


export function useGetAllQuiz() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await QuizController.getAllQuizzesController();
        //console.log(response.data);
          
        setData(response.data);
      } catch (err) {
        console.error("Fetch Quizzes Error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return { data, loading, error };
}

export async function createQuiz(quizName, topic, level, duration) {
  try {
    const response = await QuizController.createQuizController(quizName, topic, level, duration);
    return { success: true, response };
  } catch (error) {
    console.error("Create Quiz Error:", error);
    return { success: false, error };
  }
}

export async function addClassToQuiz(quizName, className) {
  try {
    const response = await QuizController.addClasstoQuizService(quizName, className);
    return { success: true, response };
  } catch (error) {
    console.log("add class to quiz Error: ", error)
    return {success:false, error}
  }
}


export async function useeditQuiz(quizName, topic,level,duration) {
  try {
    const response = await QuizController.editQuizController(quizName, topic,level,duration);
    return { success: true, response };
  } catch (error) {
    console.log("add class to quiz Error: ", error)
    return {success:false, error}
  }
}

export async function usedeleteQuiz(quizName, className) {
  try {
    const response = await QuizController.deleteQuizController(quizName, className);
    return { success: true, response };
  } catch (error) {
    console.log("add class to quiz Error: ", error)
    return {success:false, error}
  }
}

