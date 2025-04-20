import api from '../api';

export const getTeacherClassService = async () => {
    try {
        return api.get('/teacher/teacher_classes/');
    } catch (error) {
        console.error("Service Error: ", error);
        throw error;
    }
}
export const getStudentsClassService = async (className) => {
    try {
        return api.post('/teacher/class_students/', {className});
    } catch (error) {
        console.error("Service Error: ", error);
        throw error;
    }
}
export const removeStudentFromClassService = async(className, studentName) => {
    try {
        const payload = { className, studentName };
        console.log("Payload being sent:", payload);
        return api.post('/teacher/remove_student/', payload);
    } catch (error) {
        console.error("Service Error: ", error);
        throw error;
    }
}
export const addStudentToClassService = async(className, studentName) => {
    try {
        const payload = { className, studentName };
        console.log("Payload being sent:", payload);
        return api.post('/teacher/add_student/', payload);
    } catch (error) {
        console.error("Service Error: ", error);
        throw error;
    }
}
export const createClassForTeacherService = async(className ) => {
    try {
        const payload = { className };
        console.log("Payload being sent:", payload);
        return api.post('/teacher/create_class/', payload);
    } catch (error) {
        console.error("Service Error: ", error);
        throw error;
    }
}
export const removeClassFromTeacherService = async(className) => {
    try {
        const payload = { className };
        console.log("Payload being sent:", payload);
        return api.post('/teacher/remove_class/', payload);
    } catch (error) {
        console.error("Service Error: ", error);
        throw error;
    }
}