import { useEffect, useState } from 'react';
import * as TeacherController from '../controllers/TeacherController';

export function useTeacherClasses(refreshKey, success){
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClasses() {
      try {
        const response = await TeacherController.getTeacherClasses();
        // console.log(response.data.classes)
        setClasses(response?.data?.classes || []);
      } catch (error) {
        console.error("Hook Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchClasses();
  }, [refreshKey, success]);
  return { classes, loading };
}

export function useShowStudents(className, refreshKey){
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await TeacherController.getStudentsClass(className);
        console.log(response.data.studentsName)
        setStudents(response?.data?.studentsName || []);
      } catch (error) {
        console.error("Hook Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, [className, refreshKey]);
  return { students, loading };
}

export function useRemoveStudentFromClass(){
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const remove = async (className, studentName) => {
    setLoading(true)
    try {
      const response = await TeacherController.deleteStudentFromClass(className, studentName);
      console.log("Remove Response ", response)
      setSuccess(true)
      return true;
    } catch (error) {
      console.error("Hook Error:", error);
      setSuccess(false);
      return false;
    } finally {
      setLoading(false);
    }
  };
  const reset = () => setSuccess(false);

  return { remove, loading, success, reset };
}

/*export function useAddStudentToClass(className, studentName){
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function addStudent() {
      try {
        const response = await TeacherController.addStudentToClass(className, studentName);
        setSuccess(response);
      } catch (error) {
        console.error("Hook Error:", error);
      } finally {
        setLoading(false);
      }
    }
    addStudent();
  }, [className, studentName]);
  return {success, loading};
}*/

export async function useAddStudentToClass(className, studentName) {
  try {
    const response = await TeacherController.addStudentToClass(className, studentName);
    return { success: true, response };
  } catch (error) {
    console.error("Add Student Error:", error);
    return { success: false, error };
  }
}

export function useCreateClassForTeacher(className){
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (className){
      async function removeClass() {
        setLoading(true);
        try {
          const response = await TeacherController.createClassForTeacher(className);
          setSuccess(response);
        } catch (error) {
          console.error("Hook Error:", error);
        } finally {
          setLoading(false);
        }
      }
      removeClass();
    }
  }, [className]);

  const reset = () => {
    setSuccess(false);
  };

  return {success, loading, reset};
}

export function useRemoveClassFromTeacher(className){
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (className){
      async function addStudent() {
        setLoading(true);
        try {
          const response = await TeacherController.removeClassFromTeacher(className);
          setSuccess(response);
        } catch (error) {
          console.error("Hook Error:", error);
        } finally {
          setLoading(false);
        }
      }
      addStudent();
    }
  }, [className]);
  const reset = () => {
    setSuccess(false);
  };
  return {success, loading, reset};
}