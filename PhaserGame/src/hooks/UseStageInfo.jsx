import { useState, useEffect, useCallback } from "react";
import * as StageController from "../controllers/StageController";


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

        // Filter logic — one entry per username (best score / shortest duration)
        const filtered = Object.values(
          data.stageData.reduce((acc, entry) => {
            const { username, score, duration } = entry;

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

        // Sort by highest score, then lowest duration
        const sorted = filtered.sort((a, b) => {
          if (b.score === a.score) {
            return a.duration - b.duration; // shorter duration first if scores tie
          }
          return b.score - a.score; // higher score first
        });

        console.log("Filtered & sorted data:", sorted);
        setStageInfo(sorted);
      } catch (err) {
        console.error("Error fetching specific stage info:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStageInfo();
  }, [stageNumber]); // re-run when stage changes

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


export const useGetGlobalStageInfo = (username) => {
  const [globalStageInfo, setGlobalStageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGlobalInfo = async () => {
      try {
        setLoading(true);
        const data = await StageController.getGlobalStageInformation();

        let result = [];

        if (Array.isArray(data.message)) {
          // Filter by username if provided
          result = username
            ? data.message.filter(
                (entry) =>
                  entry.username &&
                  entry.username.toLowerCase() === username.toLowerCase()
              )
            : data.message;

          // Optional sorting — highest average score first
          result.sort((a, b) => b.averageScore - a.averageScore);
        } else {
          result = [data];
        }

        setGlobalStageInfo(result);
      } catch (err) {
        console.error("Error fetching global stage info:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalInfo();
  }, [username]); // Re-fetch when username changes

  return { globalStageInfo, loading, error };
};

export const getAUserStageInformation = async () => {
  try {
    // Assuming StageController.getAUserStageInformation() is the correct function
    // as per your request.
    return await StageController.getAUserStageInformation(); 
  } catch (error) {
    console.error("Error fetching user stage info:", error);
    // Re-throw the error so the calling function can handle it
    throw error;
  }
};

