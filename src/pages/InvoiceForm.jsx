import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const InvoiceForm = ({ onLogout }) => {
  const [formData, setFormData] = useState({
    ownerName: '',
    dogName: '',
    trainingProgram: '',
    price: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ownerName: formData.ownerName,
          dogName: formData.dogName,
          trainingProgram: formData.trainingProgram,
          price: parseFloat(formData.price),
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error('Server did not return JSON: ' + text);
      }

      const data = await response.json();

      if (data.url) {
        setFormData({
          ownerName: '',
          dogName: '',
          trainingProgram: '',
          price: '',
        });
        // Redirect to payment options page with checkoutUrl in state
        navigate('/payment-options', { state: { checkoutUrl: data.url } });
      } else {
        alert('Failed to generate payment link');
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-10 px-4">
      <div className="mx-auto w-full max-w-md bg-white p-8 rounded shadow text-center relative">
        {/* Sign Out Button */}
        <button
          onClick={onLogout}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Sign Out
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Primal Canine</h1>
        <img src="/logo.png" alt="Logo" className="w-32 h-32 mx-auto mb-6" />
        {/* Only show the form here */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owner's Name</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
              className="block w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dog's Name</label>
            <input
              type="text"
              name="dogName"
              value={formData.dogName}
              onChange={handleChange}
              required
              className="block w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Training Program</label>
            <input
              type="text"
              name="trainingProgram"
              value={formData.trainingProgram}
              onChange={handleChange}
              required
              className="block w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="1"
              step="0.01"
              className="block w-full border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded font-semibold hover:bg-blue-700 transition"
          >
            Generate Payment Options
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
