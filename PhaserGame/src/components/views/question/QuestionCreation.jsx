import { useEffect, useState } from "react";
import { useCreateQuestion } from "../../../hooks/UseQuestion";

function CreateQuestion(){
    const [formData, setFormData] = useState({
        questionName: "",
        questionDescription: "",
        numerator: "",
        denominator: ""
    });
    const [submittedData, setSubmittedData] = useState(null);
    const {success, loading} = useCreateQuestion(submittedData);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };
    const handleSubmit = () => {
        setSubmittedData(formData); // Only submit when button is clicked
    };
    return(
        <div>
            <input
                name="questionName"
                value={formData.questionName}
                onChange={handleChange}
                placeholder="Question Name"
            />
            <input
                name="questionDescription"
                value={formData.questionDescription}
                onChange={handleChange}
                placeholder="Question Description"
            />
            <input
                name="numerator"
                value={formData.numerator}
                onChange={handleChange}
                placeholder="Numerator"
            />
            <input
                name="denominator"
                value={formData.denominator}
                onChange={handleChange}
                placeholder="Denominator"
            />
            {/* Optional: Show loading/success feedback */}
            {loading && <p>Submitting...</p>}
            {success && <p>Question created successfully!</p>}
            <button onClick={() => handleSubmit()}>Confirm</button>
        </div>
    );
}

export default CreateQuestion;