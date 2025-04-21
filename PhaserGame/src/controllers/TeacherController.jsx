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
export const deleteStudentFromClass = async (className, studentName) => {
    try {
        const response = await TeacherService.removeStudentFromClassService(className, studentName);
        return response;
    } catch (error) {
        console.error("TeacherController Error:", error);
        throw error;
    }
}
export const addStudentToClass = async (className, studentName) => {
    try {
        await TeacherService.addStudentToClassService(className, studentName);
        return true;
    } catch (error) {
        console.error("TeacherController Error:", error);
        throw error;
    }
}

export const createClassForTeacher = async ( className ) => {
    try {
        await TeacherService.createClassForTeacherService(className);
        return true;
    } catch (error) {
        console.error("TeacherController Error:", error);
        throw error;
    }
}
export const removeClassFromTeacher =  async ( className ) => {
    try {
        await TeacherService.removeClassFromTeacherService(className);
        return true;
    } catch (error) {
        console.error("TeacherController Error:", error);
        throw error;
    }
}