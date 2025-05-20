import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceForm from './pages/InvoiceForm';
import Login from './pages/Login';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

function App() {
  const isLoggedIn = !!localStorage.getItem('token'); // ✅ Fix here

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <InvoiceForm /> : <Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
}

export default App;

