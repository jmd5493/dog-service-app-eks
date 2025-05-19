import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceForm from './pages/InvoiceForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvoiceForm />} />
      </Routes>
    </Router>
  );
};

export default App;
