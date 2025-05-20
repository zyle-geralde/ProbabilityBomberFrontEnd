import { use, useEffect, useState } from "react";
import { useDeleteQuestion } from "../../../hooks/UseQuestion";

function DeleteQuestion(){
    const [questionName, setQuestionName] = useState('')
    const { deleteQuestion, success, loading } = useDeleteQuestion();
    const handleChange  = (e) => {
        const { value } = e.target;
        setQuestionName(value);
    };
    const handleDelete = () => {
        deleteQuestion(questionName)
    }
    return(
        <div>
            <input
                type="text"
                name="questionName"
                value={questionName}
                onChange={handleChange}
                placeholder="Question Name"
            />
            <button
                onClick={handleDelete}
                disabled={success || loading || !questionName}
            >
                Delete Question
            </button>
        </div>
    )
}

export default DeleteQuestion;