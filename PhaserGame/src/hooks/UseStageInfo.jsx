import { useState, useEffect, useCallback } from "react";
import * as StageController from "../controllers/StageController";

/*export function useStageInfo(stageNumber) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const STORAGE_KEY = `stage_${stageNumber}_students`;

  const fetchStageInfo = useCallback(async () => {
    try {
      setLoading(true);

      // Check localStorage first
      const cached = localStorage.getItem(STORAGE_KEY);
      const cachedTime = localStorage.getItem(`${STORAGE_KEY}_time`);
      const now = Date.now();

      if (cached && cachedTime && now - parseInt(cachedTime) < 10 * 60 * 1000) {
        setStudents(JSON.parse(cached));
        setLoading(false);
        return;
      }

      // Fetch from backend
      const data = await StageController.getSpecificStageInformation(stageNumber);
      const stage = Array.isArray(data) && data.length > 0 ? data[0] : null;
      const studentData = stage?.students || [];

      setStudents(studentData);

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(studentData));
      localStorage.setItem(`${STORAGE_KEY}_time`, now.toString());

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [stageNumber, STORAGE_KEY]);

  useEffect(() => {
    fetchStageInfo();

    // Auto-refresh every 10 minutes
    const interval = setInterval(fetchStageInfo, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchStageInfo]);

  // Manual refresh: call this when user completes a stage
  const refresh = async () => {
    try {
      const data = await StageController.getSpecificStageInformation(stageNumber);
      const stage = Array.isArray(data) && data.length > 0 ? data[0] : null;
      const studentData = stage?.students || [];

      setStudents(studentData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(studentData));
      localStorage.setItem(`${STORAGE_KEY}_time`, Date.now().toString());
    } catch (err) {
      setError(err);
    }
  };

  return { students, loading, error, refresh };
}*/

export const useGetSpecificStageInfo = (stageNumber) => {
  const [stageInfo, setStageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStageInfo = async () => {
      try {
        setLoading(true);
        const data = await StageController.getSpecificStageInformation(stageNumber);
        console.log("Raw data:", data);

        // Filter logic
        const filtered = Object.values(
          data.stageData.reduce((acc, entry) => {
            const { username, score, duration } = entry;

            // If username not in acc, add it
            if (!acc[username]) {
              acc[username] = entry;
            } else {
              const current = acc[username];
              if (
                score > current.score || // higher score
                (score === current.score && duration < current.duration) // shorter duration
              ) {
                acc[username] = entry;
              }
            }
            return acc;
          }, {})
        );

        console.log("Filtered data:", filtered);
        setStageInfo(filtered);
      } catch (err) {
        console.error("Error fetching specific stage info:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStageInfo();
  }, []); 

  return { stageInfo, loading, error };
};


export async function addUserStageInfo(stageNumber,score,duration, numberOfStars) {
  try {
    console.log(stageNumber,score,duration,numberOfStars)
    const response = await StageController.addStageInformation(stageNumber, score, duration, numberOfStars)
    console.log(response)
  }
  catch (error) {
    console.log(error)
    alert("Failed to add user stage info.");
  }
}
