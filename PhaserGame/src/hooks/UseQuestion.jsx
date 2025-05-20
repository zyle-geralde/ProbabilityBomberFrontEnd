import { useEffect, useState } from "react";
import * as QuestionController from '../controllers/QuestionController';
export function useCreateQuestion(formData){
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if(formData){
            async function createQuestion() {
                setLoading(true);
                try {
                    const response = await QuestionController.createQuestion(formData)
                    setSuccess(response);
                } catch (error) {
                    console.error("Hook Error:", error);
                } finally {
                    setLoading(false);
                }
            }
            createQuestion();
        }
    }, [formData]);
    return {success, loading};
}
export function useEditQuestion(formData){
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if(formData){
            async function editQuestion() {
                setLoading(true);
                try {
                    const response = await QuestionController.editQuestion(formData)
                    setSuccess(response);
                } catch (error) {
                    console.error("Hook Error:", error);
                } finally {
                    setLoading(false);
                }
            }
            editQuestion();
        }
    }, [formData]);
    return {success, loading};
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

export function useRemoveAQuestion(){
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const remove = async (formData) => {
        setLoading(true);
        setSuccess(false);
        try {
            const response = await QuestionController.removeAQuestion(formData);
            setSuccess(response);
        } catch (error) {
            console.error("Hook Error:", error);
        } finally {
            setLoading(false);
        }
    }
    return {remove, success, loading}
}

export function useDeleteQuestion(){
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const deleteQuestion = async (questionName) => {
        setLoading(true);
        setSuccess(false);
        try {
            const response = await QuestionController.deleteQuestion(questionName);
            setSuccess(response)
        } catch (error) {
            console.error("Hook Error:", error);
        } finally {
            setLoading(false);
        }
    }
    return {deleteQuestion, success, loading}
}

export function useAddQuestionToQuiz() {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = async (formData) => {
        setLoading(true);
        try {
            const result = await QuestionController.addQuestionToQuiz(formData);
            setSuccess(result === true);
        } catch (error) {
            console.error("Hook Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return { submit, success, loading };
}