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

export const createQuizController = async ( quizName, topic, level, duration ) => {
    try {
        await QuizService.createQuizService(quizName, topic, level, duration);
        return true;
    } catch (error) {
        console.error("QuizController Error:", error);
        throw error;
    }
}

export const addClasstoQuizService = async ( quizName, className ) => {
    try {
        await QuizService.addClassToQuizService(quizName, className);
        return true;
    } catch (error) {
        console.error("QuizController Error:", error);
        throw error;
    }
}

export const editQuizController = async (quizName, topic,level,duration)=>{
    try {
        await QuizService.editQuizService(quizName, topic,level,duration);
        return true;
    } catch (error) {
        console.error("QuizController Error:", error);
        throw error;
    }
}

export const deleteQuizController = async (quizName, className)=>{
    try {
        await QuizService.deleteQuizService(quizName, className);
        return true;
    } catch (error) {
        console.error("QuizController Error:", error);
        throw error;
    }
}

export const updateStudentInformationController = async (object_payload)=>{
    try {
        await QuizService.updateStudentInformationSrevice(object_payload);
        return true;
    } catch (error) {
        console.error("QuizController Error:", error);
        throw error;
    }
}