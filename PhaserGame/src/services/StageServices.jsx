// /services/StageServices.js
import api from "../api";
import { auth } from "../firebaseConfig";

// Helper to get Authorization headers
const getAuthHeaders = async () => {
  const user = auth.currentUser;
  if (!user) {
    // console.error("No current user yet");
    return {};
  }
  const token = await user.getIdToken();
//   console.log("Firebase token:", token);
  return { Authorization: `Bearer ${token}` };
};

// Add stage info for authenticated user
export const addStageInformation = async (stageNumber, score, duration, numberOfStars) => {
  const payload = { stageNumber, score, duration, numberOfStars };
  const headers = await getAuthHeaders();
  const res = await api.post("/stage/add_stage_information", payload, { headers });
  return res.data;
};

// Get specific stage info for authenticated user
export const getSpecificStageInformation = async (stageNumber) => {
  const headers = await getAuthHeaders();
  const res = await api.post("/stage/get_specific_stage_information", { stageNumber }, { headers });
  return res.data;
};


// Get global stage info (not user-specific)
export const getGlobalStageInformation = async () => {
  const res = await api.get("/stage/get_global_stage_information");
  return res.data;
};

export const getAUserStageInformation = async () => {
  const headers = await getAuthHeaders();
  const res = await api.get("/stage/get_a_user_stage_information", { headers });
  console.log("User stage data response:", res.data);
  return res.data;
};
