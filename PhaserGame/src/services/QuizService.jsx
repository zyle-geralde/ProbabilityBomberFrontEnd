import api from "../api";

export const getAllQuizzes = async () => {
    try {
        return api.get('/quiz/get_all_quiz');
    } catch (error) {
        console.error("Service Error: ", error);
        throw error;
    }
}

export const createQuizService= async(quizName, topic, level, duration ) => {
    try {
        const payload = { quizName,topic,level,duration };
        console.log("Payload being sent:", payload);
        return api.post('/quiz/create_quiz', payload);
    } catch (error) {
        console.error("Service Error: ", error);
        throw error;
    }
}
export const addClassToQuizService = async (quizName, className)=>{
    try {
        const payload = { quizName, className }
        console.log("Payload being sent:", payload);
        return api.post('quiz/add_class_quiz',payload)
    }
    catch (error) {
        console.error("Service Error: ", error)
        throw error
    }
}

export const editQuizService = async (quizName, topic,level,duration)=>{
    try {
        const payload = { quizName, topic,level,duration }
        console.log("Payload being sent:", payload);
        return api.post('quiz/edit_quiz',payload)
    }
    catch (error) {
        console.error("Service Error: ", error)
        throw error
    }
}

export const deleteQuizService = async (quizName, className)=>{
    try {
        const payload = { quizName, className }
        console.log("Payload being sent:", payload);
        return api.post('quiz/delete_class_quiz',payload)
    }
    catch (error) {
        console.error("Service Error: ", error)
        throw error
    }
}