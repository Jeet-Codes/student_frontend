import React, { useState, useEffect } from 'react';
import { createStudent, updateStudent, getStudentById } from '../Services/StudentService';
import { useParams, useNavigate } from 'react-router-dom';

const StudentForm = () => {
  const [student, setStudent] = useState({
    name: '',
    contact: '',
    details: '',
    address: '',
    pincode: ''
  });
  const { id } = useParams(); // To determine if we're editing an existing student
  const navigate = useNavigate(); // Updated hook for navigation

  useEffect(() => {
    if (id) {
      // Fetch the existing student if the id is present (update scenario)
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
        await updateStudent(id, student); // Update existing student
      } else {
        await createStudent(student); // Create new student
      }
      navigate('/students'); // Redirect to student list after save
    } catch (error) {
      console.error('Error saving student', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Contact:
          <input
            type="text"
            name="contact"
            value={student.contact}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Details:
          <input
            type="text"
            name="details"
            value={student.details}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={student.address}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Pincode:
          <input
            type="text"
            name="pincode"
            value={student.pincode}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default StudentForm;
