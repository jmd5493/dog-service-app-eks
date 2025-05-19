import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceForm from './pages/InvoiceForm';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvoiceForm />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />

      </Routes>
    </Router>
  );
};

export default App;
