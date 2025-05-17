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
                console.log("Data: ", response.data.allQuestions)
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