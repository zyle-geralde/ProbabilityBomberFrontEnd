import { useEffect, useState } from 'react';
import * as TeacherController from '../controllers/TeacherController';

export function useTeacherClasses(){
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchClasses() {
          try {
            const response = await TeacherController.getTeacherClasses();
            console.log(response.data.classes)
            setClasses(response?.data?.classes || []);
          } catch (error) {
            console.error("Hook Error:", error);
          } finally {
            setLoading(false);
          }
        }
        fetchClasses();
    }, []);
    return { classes, loading };
}

export function useShowStudents(className){
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
    }, [className]);
    return { students, loading };
}