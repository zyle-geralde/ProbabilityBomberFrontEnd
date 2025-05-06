import { useEffect, useState } from "react";
import { useCreateClassForTeacher } from "../../hooks/UseTeacher";

function CreateClass({setRefreshKey}) {
    const [inputValue, setInputValue] = useState("");
    const [className, setClassName] = useState(null);

    const {success, loading, reset} = useCreateClassForTeacher(className);

    useEffect(() => {
      if(success === true){
        setRefreshKey(prev => prev + 1);
        reset();
      }
    }, [success]);

    const handleAddClass = () => {
      setClassName(inputValue);
    }
    return (
      <div>
        <input
          type="text"
          placeholder="Create a New Class"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={() => handleAddClass()}>Confirm</button>
      </div>
    );
  }
  
  export default CreateClass;