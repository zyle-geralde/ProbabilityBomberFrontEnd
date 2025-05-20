import api from "../api";

export const getAllQuizzes = async () => {
    try {
        return api.get('/quiz/get_all_quiz');
    } catch (error) {
        console.error("Service Error: ", error);
        throw error;
    }
}