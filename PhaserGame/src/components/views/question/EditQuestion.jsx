import { useState } from "react";
import { useEditQuestion } from "../../../hooks/UseQuestion";
import RemoveAllQuestion from "../question/RemoveAllQuestion"

function EditQuestion({question}){
    const originalName = question.questionName;
    const [removeQuestion, setRemoveQuestion] = useState(null);
    const [formData, setFormData] = useState({ ...question });
    const [editingField, setEditingField] = useState(null);
    const [submittedData, setSubmittedData] = useState(null);
    const {success, loading} = useEditQuestion(submittedData);
    const handleFieldChange  = (e) => {
        const { value } = e.target;
        setFormData(prev => ({
            ...prev,
            [editingField]: editingField === "event" 
                ? value.split(",").map(v => v.trim()) 
                : value,
            ...(editingField === "questionName" && {
                originalQuestionName: originalName
            })
        }));
    };
    const confirmEdit = () => {
        setSubmittedData(formData);
        setEditingField(null); // exit edit mode
    };
        const renderField = (label, fieldName) => (
        <div style={{ marginBottom: "10px" }}>
            <strong>{label}:</strong>{" "}
            {editingField === fieldName ? (
                <>
                    <input
                        type="text"
                        value={
                            fieldName === "event"
                                ? formData[fieldName].join(", ")
                                : formData[fieldName]
                        }
                        onChange={handleFieldChange}
                    />
                    <button onClick={() => setEditingField(null)}>Cancel</button>
                    <button onClick={confirmEdit}>Save</button>
                </>
            ) : (
                <>
                    <span>{Array.isArray(formData[fieldName]) 
                        ? formData[fieldName].join(", ") 
                        : formData[fieldName]}</span>
                    <button onClick={() => setEditingField(fieldName)}>Edit</button>
                </>
            )}
        </div>
    );
    return(
        <div style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "15px" }}>
            {renderField("Question Name", "questionName")}
            {renderField("Description", "questionDescription")}
            {renderField("Numerator", "numerator")}
            {renderField("Denominator", "denominator")}
            {renderField("Probability", "probability")}
            {renderField("Events", "event")}
            {renderField("Created By", "createdBy")}

            <button onClick={confirmEdit}>Confirm All Edits</button>

            {formData.questionName && (
                <RemoveAllQuestion questionName={formData.questionName} />
            )}
            
            {loading && <p>Submitting...</p>}
            {success && <p>Question updated successfully!</p>}
        </div>
    );
}

export default EditQuestion;