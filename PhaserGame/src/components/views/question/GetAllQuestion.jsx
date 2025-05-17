import { useState } from "react";
import { useGetAllQuestion } from "../../../hooks/UseQuestion";

function GetAllQuestion({refreshKey}){
    const { questions, loading } = useGetAllQuestion(refreshKey);

    if (loading) return <p>Loading questions...</p>;
    return(
        <div>
            {questions && questions.length > 0 ? (
                questions.map((q, idx) => (
                    <div key={idx}>
                        <p><strong>Name:</strong> {q.questionName}</p>
                        <p><strong>Description:</strong> {q.questionDescription}</p>
                        <p><strong>Numerator:</strong> {q.numerator}</p>
                        <p><strong>Denominator:</strong> {q.denominator}</p>
                        <p><strong>Probability:</strong> {q.probability || 'N/A'}</p>
                        <hr />
                    </div>
                ))
            ) : (
                <p>No questions found.</p>
            )}
        </div>
    )
}
export default GetAllQuestion;