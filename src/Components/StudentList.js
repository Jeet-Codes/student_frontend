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
    <div className="p-4">
    <h2 className="text-2xl font-semibold mb-4">Student List</h2>
    <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Id</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Contact</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Details</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Address</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Pincode</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {students.map((student) => (
          <tr key={student.id} className="hover:bg-gray-100">
            <td className="px-4 py-2 text-sm text-gray-700">{student.id}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{student.name}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{student.contact}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{student.details}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{student.address}</td>
            <td className="px-4 py-2 text-sm text-gray-700">{student.pincode}</td>
            <td className="px-4 py-2 text-sm text-gray-700">
              <Link
                to={`/students/edit/${student.id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </Link>
              &nbsp;
              <button
                onClick={() => handleDelete(student.id)}
                className="text-red-600 hover:text-red-800 ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
};

export default StudentList;
