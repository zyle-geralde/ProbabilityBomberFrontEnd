import { useEffect, useState } from "react";
import { useRemoveAllQuestion } from "../../../hooks/UseQuestion";

// Remove a specific question in all of the quizzes exist.
function RemoveAllQuestion({questionName}){
    const { removeAll, success, loading } = useRemoveAllQuestion();
    return(
        <div>
            <button
                onClick={() => removeAll(questionName)}
                disabled={success || loading}
            >
                Remove All Instances of This Question in All Quizzes
            </button>
            {loading && <p>Removing...</p>}
            {success && <p>Removed successfully.</p>}
        </div>
    )
}


export default RemoveAllQuestion;