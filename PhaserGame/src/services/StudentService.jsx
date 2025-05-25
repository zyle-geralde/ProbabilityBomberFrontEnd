import api from "../api";


export const getStudentClassService = async () => {
    try {
        return api.get('/student/get_student_class/');
    } catch (error) {
        console.error("Service Error: ", error);
        throw error;
    }
}