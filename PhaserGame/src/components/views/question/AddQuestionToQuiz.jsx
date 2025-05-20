import { useEffect, useState } from "react";
import { useAddQuestionToQuiz } from "../../../hooks/UseQuestion";

function AddQuestionToQuiz() {
    const [formData, setFormData] = useState({
        questionName: "",
        quizName: ""
    });

    const { submit, success, loading } = useAddQuestionToQuiz();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (formData.questionName && formData.quizName) {
            submit(formData);
        }
    };

    return (
        <div>
            <input
                type="text"
                name="questionName"
                value={formData.questionName}
                onChange={handleChange}
                placeholder="Question Name"
            />
            <input
                type="text"
                name="quizName"
                value={formData.quizName}
                onChange={handleChange}
                placeholder="Quiz Name"
            />
            <button
                onClick={handleSubmit}
                disabled={loading || !formData.questionName || !formData.quizName}
            >
                Add a Question in Specific Quiz
            </button>
            {loading && <p>Adding...</p>}
            {success && <p>Added successfully.</p>}
        </div>
    );
}

export default AddQuestionToQuiz;