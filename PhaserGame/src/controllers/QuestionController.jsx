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