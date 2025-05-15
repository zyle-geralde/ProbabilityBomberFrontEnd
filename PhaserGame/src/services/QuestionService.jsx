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