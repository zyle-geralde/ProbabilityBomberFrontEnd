// /controllers/StageController.js
import * as StageService from "../services/StageServices";

const LOCAL_KEY = "stageProgress";

// --- Core API calls ---
export const addStageInformation = async (stageNumber, score, duration, numberOfStars) => {
  try {
    const res = await StageService.addStageInformation(stageNumber, score, duration, numberOfStars);
    await updateStageDataAfterCreate();
    return res;
  } catch (error) {
    console.error("Error adding stage info:", error);
    throw error;
  }
};

export const getSpecificStageInformation = async (stageNumber) => {
  try {
    return await StageService.getSpecificStageInformation(stageNumber);
  } catch (error) {
    console.error("Error fetching specific stage info:", error);
    throw error;
  }
};

export const getGlobalStageInformation = async () => {
  try {
    return await StageService.getGlobalStageInformation();
  } catch (error) {
    console.error("Error fetching global stage info:", error);
    throw error;
  }
};

export const getAUserStageInformation = async () => {
  try {
    return await StageService.getAUserStageInformation(); // no uid
  } catch (error) {
    console.error("Error fetching user stage info:", error);
    throw error;
  }
};

// --- Local caching ---
const saveStageDataToLocal = (stages) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(stages));
};

export const getStageDataFromLocal = () => {
  const cached = localStorage.getItem(LOCAL_KEY);
  return cached ? JSON.parse(cached) : null;
};

export const fetchAndCacheUserStageData = async () => {
  const res = await StageService.getAUserStageInformation();
  const rawStages = res.userStageData || [];
  console.log("Raw stage data:", rawStages);

  const processed = rawStages.map(stage => ({
    title: stage.stageNumber,
    score: stage.score,
    durationMinutes: Math.round(stage.duration / 60),
    stars: stage.numberOfStars,
  }));

  saveStageDataToLocal(processed);
  return processed;
};

export const updateStageDataAfterCreate = async () => fetchAndCacheUserStageData();
