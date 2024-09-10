import React, { useState, useEffect } from 'react';
import { getStudents, deleteStudent } from '../Services/StudentService';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this student?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteStudent(id);
          fetchStudents();
          toast.success('Student deleted successfully');
        } catch (error) {
          console.error('Error deleting student', error);
          toast.error('Failed to delete student');
        }
      }
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      text: 'You will be logged out of your session!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token'); 
        toast.success('Logged out successfully');
        navigate('/login'); 
      }
    });
  };

  const handleSubmit = () => {
    navigate('/students/new');
  };

  return (
    <div className="p-4 mx-auto flex justify-center flex-col">
      <h2 className="text-2xl font-semibold mb-4 text-center">Student List</h2>
      <div className="space-x-[570px] mx-auto mb-4">
        <button className="p-2 bg-red-300 inline-block rounded-lg hover:bg-red-500" onClick={handleLogout}>
          Logout
        </button>
        <button className="p-2 bg-blue-300 inline-block rounded-lg hover:bg-blue-500" onClick={handleSubmit}>
          Create Student
        </button>
      </div>
      <table className="max-w-[70%] divide-y divide-gray-200 border border-gray-300 mx-auto">
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
