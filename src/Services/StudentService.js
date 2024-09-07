import axios from 'axios';

const apiUrl = 'http://localhost:8181/api/v1/student'; // Replace with your actual API URL

export const getStudents = () => axios.get(apiUrl);

export const getStudentById = (id) => axios.get(`${apiUrl}/${id}`);

export const createStudent = (student) => axios.post(apiUrl, student);

export const updateStudent = (id, student) => axios.put(`${apiUrl}/${id}`, student);

export const deleteStudent = (id) => axios.delete(`${apiUrl}/${id}`);
