import api from '../api';

export const getTeacherClassService = async () => {
    return api.get('/teacher/teacher_classes/');
}
export const getStudentsClassService = async (className) => {
    return api.post('/teacher/class_students/', {className});
}