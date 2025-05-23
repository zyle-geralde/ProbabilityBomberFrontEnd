import { useEffect, useState } from "react";
import * as QuestionController from '../controllers/QuestionController';

export async function useCreateQuestion(formData) {
  try {
    const response = await QuestionController.createQuestion(formData);
    return { success: response, error: null };
  } catch (error) {
    console.error("API Error:", error);
    return { success: null, error };
  }
}
export async function useEditQuestion(formData){
    try {
        const response = await QuestionController.editQuestion(formData);
        return { success: response, error: null };
    } catch (error) {
        console.error("EditQuestion Error:", error);
        return { success: false, error };
    }
}
export function useGetAllQuestion(refreshKey){
    const [questions, setQuestions] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function getAllQuestion() {
            setLoading(true);
            try {
                const response = await QuestionController.getAllQuestion()
                setQuestions(response.data.allQuestions);
            } catch (error) {
                console.error("Hook Error:", error);
            } finally {
                setLoading(false);
            }
        }
        getAllQuestion();
    }, [refreshKey]);
    return {questions, loading};
}

export function useRemoveAllQuestion(){
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const removeAll = async (questionName) => {
        setLoading(true);
        setSuccess(false);
        try {
            const response = await QuestionController.removeAllQuestion(questionName);
            setSuccess(response);
        } catch (error) {
            console.error("Hook Error:", error);
        } finally {
            setLoading(false);
        }
    }
    return {removeAll, success, loading}
}

export async function useRemoveAQuestion(formData) {
    try {
        const response = await QuestionController.removeAQuestion(formData);
        return { success: response, error: null };
    } catch (error) {
        console.error("removeAQuestion Error:", error);
        return { success: false, error };
    }
}

export async function useDeleteQuestion(questionName) {
  try {
    const response = await QuestionController.deleteQuestion(questionName);
    return { success: response, error: null };
  } catch (error) {
    console.error("deleteQuestion Error:", error);
    return { success: false, error };
  }
}

export async function useAddQuestionToQuiz(formData) {
    try {
        const result = await QuestionController.addQuestionToQuiz(formData);
        return { success: result, error: null };
    } catch (error) {
        console.error("AddQuestionToQuiz Error:", error);
        return { success: null, error };
    }
}