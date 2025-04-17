import * as TeacherService from '../services/TeacherService';
export const getTeacherClasses = async () => {
    try {
        const response = await TeacherService.getTeacherClassService();
        return response
    } catch (error) {
        console.error("TeacherController Error:", error);
        throw error;
    }
}
export const getStudentsClass = async (className) => {
    try {
        const response = await TeacherService.getStudentsClassService(className);
        return response
    } catch (error) {
        console.error("TeacherController Error:", error);
        throw error;
    }
}