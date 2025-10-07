import { useState, useEffect, useCallback } from "react";
import * as StageController from "../controllers/StageController";

export function useStageInfo(stageNumber) {
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
}
