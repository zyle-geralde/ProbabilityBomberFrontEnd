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