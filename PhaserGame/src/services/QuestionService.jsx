import api from '../api';

export const questionCreation = async (formData) => {
    try {
        const payload = formData;
        return api.post('/question/create_question/', payload);
    } catch (error) {
        console.error("Service Error: ", error);
        throw error;
    }
}
export const editQuestionService = async (formData) => {
    try {
        const payload = formData;
        return api.post('/question/edit_question/', payload);
    } catch (error) {
        console.error("Service Error: ", error);
        throw error;
    }
}
export const getAllQuestionService = async () => {
    try {
        return api.get('/question/get_all_question/');
    } catch (error) {
        console.error("Service Error: ", error);
        throw error;
    }
}
export const removeAllQuestionService = async (formData) => {
    try {
        const payload = formData
        return api.post('/question/remove_all_question/', payload);
    } catch (error) {
        console.error("Service Error: ", error);
        throw error;
    }
}
export const removeAQuestionService = async (formData) => {
    try {
        const payload = formData;
        return api.post('/question/remove_all_question/', payload);
    } catch (error) {
        console.error("Service Error: ", error);
        throw error;
    }
}
export const deleteQuestionService = async (questionName) => {
    try {
        const payload = {questionName};
        return api.post('/question/delete_question/', payload)
    } catch (error) {
        console.error("Service Error: ", error);
        throw error;
    }
}
export const addQuestionToQuizService = async (formData) => {
    try {
        const payload = formData;
        return api.post('/question/add_question_to_quiz/', payload);
    } catch (error) {
        console.error("Service Error: ", error);
        throw error;
    }
}