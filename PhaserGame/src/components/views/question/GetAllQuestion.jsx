import { useState } from "react";
import { useGetAllQuestion } from "../../../hooks/UseQuestion";
import EditQuestion from '../../views/question/EditQuestion'

function GetAllQuestion({refreshKey}){
    const { questions, loading } = useGetAllQuestion(refreshKey);

    if (loading) return <p>Loading questions...</p>;
    return(
        <div>
            {questions && questions.length > 0 ? (
                questions.map((q, idx) => (
                    <EditQuestion key={idx} question={q} />
                ))
            ) : (
                <p>No questions found.</p>
            )}
        </div>
    )
}
export default GetAllQuestion;