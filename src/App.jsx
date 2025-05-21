import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceForm from './pages/InvoiceForm';
import Login from './pages/Login';
import PaymentOptions from './pages/PaymentOptions';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn
              ? <InvoiceForm onLogout={handleLogout} />
              : <Login onLogin={handleLogin} />
          }
        />
        <Route path="/payment-options" element={<PaymentOptions />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </Router>
  );
}

export default App;
