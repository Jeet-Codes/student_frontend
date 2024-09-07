import React, { useState, useEffect } from 'react';
import { getStudents, deleteStudent } from '../Services/StudentService';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      fetchStudents(); // Refresh list after deletion
    } catch (error) {
      console.error('Error deleting student', error);
    }
  };

  return (
    <div>
      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Details</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
                <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.contact}</td>
              <td>{student.details}</td>
              <td>{student.address}</td>
              <td>{student.pincode}</td>
              <td>
                <Link to={`/students/edit/${student.id}`}>Edit</Link>
                &nbsp;
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
