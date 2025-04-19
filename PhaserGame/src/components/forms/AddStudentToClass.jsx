import { useState } from "react";
import { useAddStudentToClass } from "../../hooks/UseTeacher";

function AddStudentToClass({className}){
    const [inputValue, setInputValue] = useState("");
    const [studentName, setStudentName] = useState(null);

    const {success, loading} = useAddStudentToClass(className, studentName);

    const handleAddStudent = () => {
        setStudentName(inputValue);
    }

    return(
        <div>
            <h3>Add Student in {className}</h3>
            <input
              type="text"
              placeholder="Student Name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={() => handleAddStudent()}>Add Student</button>
        </div>
    );
}
export default AddStudentToClass;