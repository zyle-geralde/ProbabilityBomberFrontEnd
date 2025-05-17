import * as QuestionService from '../services/QuestionService'
export const createQuestion = async (formData) => {
    try {
        await QuestionService.questionCreation(formData)
        return true;
    } catch (error) {
        console.error("QuestionController Error:", error);
        throw error;
    }
}
export const editQuestion = async (formData) => {
    try {
        await QuestionService.editQuestionService(formData)
        return true;
    } catch (error) {
        console.error("QuestionController Error:", error);
        throw error;
    }
}
export const getAllQuestion = async () => {
    try {
        return QuestionService.getAllQuestionService();
    } catch (error) {
        console.error("QuestionController Error:", error);
        throw error;
    }
}