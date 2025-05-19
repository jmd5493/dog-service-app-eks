import React, { useState } from 'react';

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    dogName: '',
    trainingProgram: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stripeLink = 'https://buy.stripe.com/test_blahblah';
    window.location.href = stripeLink;
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-10">
      <div className="mx-auto w-full max-w-md bg-white p-8 rounded shadow text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Primal Canine</h1>
      <img src="/logo.png" alt="Logo" className="w-32 h-32 mx-auto mb-4" />
        {/* <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Invoice</h1> */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
