import * as StudentCotroller from "../controllers/StudentController"
import { useEffect } from "react";
import { useState } from "react";

export function useGetStudentClass() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getClass = async () => {
      try {
        const response = await StudentCotroller.getStudentClassController();
          
        setData(response.data);
      } catch (err) {
        console.error("Fetch Quizzes Error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getClass();
  }, []);

  return { data, loading, error };
}