import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from './Components/StudentList';
import StudentForm from './Components/StudentForm';
import Login from './Components/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/new" element={<StudentForm />} />
        <Route path="/students/edit/:id" element={<StudentForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<StudentList />} />
      </Routes>
    </Router>
  );
};

export default App;
