import { useEffect, useState } from "react";
import { useRemoveAQuestion } from "../../../hooks/UseQuestion";

// Remove a question in a specific quizzes exist.
function RemoveAQuestion(){
    const [formData, setFormData] = useState({
        questionName: "",
        quizName: ""
    });
    const { remove, success, loading } = useRemoveAQuestion();
    const handleChange  = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name] : value,
        }));
    };
    const handleRemove = () => {
        remove(formData)
    }
    useEffect(() => {
        if(success) {
            setFormData({ questionName: "", quizName: "" });
        }
    }, [success]);
    return(
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
                onClick={handleRemove}
                disabled={success || loading || !formData.questionName || !formData.quizName}
            >
                Remove a Question in Specific Quiz
            </button>
            {loading && <p>Removing...</p>}
            {success && <p>Removed successfully.</p>}
        </div>
    )
}


export default RemoveAQuestion;