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