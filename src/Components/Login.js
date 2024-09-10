import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
 const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8181/login', credentials);
      console.log('Logged in successfully', response.data);
      navigate('/students')

    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="p-6 max-w-sm mt-[10%] mx-auto bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username:
        </label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password:
        </label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Login
      </button>
    </form>
  </div>
  
  );
};

export default Login;
