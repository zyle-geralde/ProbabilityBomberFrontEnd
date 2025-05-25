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
