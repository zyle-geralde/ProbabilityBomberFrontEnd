import * as QuizService from "../services/QuizService"


export const getAllQuizzesController = async () => {
    try {
        const response = await QuizService.getAllQuizzes();
        return response
    } catch (error) {
        console.error("getAllQuizControler Error:", error);
        throw error;
    }
}