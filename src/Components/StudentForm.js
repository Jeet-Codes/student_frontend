import React, { useState, useEffect } from 'react';
import { createStudent, updateStudent, getStudentById } from '../Services/StudentService';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const StudentForm = () => {
  const [student, setStudent] = useState({
    name: '',
    contact: '',
    details: '',
    address: '',
    pincode: ''
  });
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getStudentById(id).then((response) => setStudent(response.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateStudent(id, student); 
        toast.success('student update successfully')
      } else {
        await createStudent(student);
        toast.success('student create successfully')
      }
      navigate('/students');
    } catch (error) {
      console.error('Error saving student', error);
    }
  };

  return (
<div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
  <h2 className="text-xl font-bold mb-4">
    {id ? 'Edit Student' : 'Add Student'}
  </h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Name:
      </label>
      <input
        type="text"
        name="name"
        value={student.name}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Contact:
      </label>
      <input
        type="text"
        name="contact"
        value={student.contact}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Details:
      </label>
      <input
        type="text"
        name="details"
        value={student.details}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Address:
      </label>
      <input
        type="text"
        name="address"
        value={student.address}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Pincode:
      </label>
      <input
        type="text"
        name="pincode"
        value={student.pincode}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {id ? 'Update' : 'Create'}
    </button>
  </form>
</div>

  );
};

export default StudentForm;
