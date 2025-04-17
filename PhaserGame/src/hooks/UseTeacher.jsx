import { useEffect, useState } from 'react';
import * as TeacherController from '../controllers/TeacherController';

export function useTeacherClasses(){
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchClasses() {
          try {
            const data = await TeacherController.getTeacherClasses();
            console.log(data.data.classes)
            setClasses(data.data.classes);
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
                const data = await TeacherController.getStudentsClass(className);
                console.log(data.data.studentsName)
                setStudents(data.data.studentsName);
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