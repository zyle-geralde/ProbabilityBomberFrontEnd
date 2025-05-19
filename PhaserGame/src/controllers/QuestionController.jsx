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
        return await QuestionService.getAllQuestionService();
    } catch (error) {
        console.error("QuestionController Error:", error);
        throw error;
    }
}
export const removeAllQuestion = async (questionName) => {
    try {
        await QuestionService.removeAllQuestionService(questionName);
        return true;
    } catch (error) {
        console.error("QuestionController Error:", error);
        throw error;
    }
}