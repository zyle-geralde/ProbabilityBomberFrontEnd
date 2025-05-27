import * as StudentService from "../services/StudentService"


export const getStudentClassController = async () => {
    try {
        const response = await StudentService.getStudentClassService();
        return response
    } catch (error) {
        console.error("getStudentClassController Error:", error);
        throw error;
    }
}

export const getStudentInformationController = async () => {
    try {
        const response = await StudentService.getStudentInformationService();
        return response
    } catch (error) {
        console.error("getStudentInformationController Error:", error);
        throw error;
    }
}
