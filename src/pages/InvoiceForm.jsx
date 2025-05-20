import React, { useState } from 'react';
import QRCode from 'react-qr-code';


const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    dogName: '',
    trainingProgram: '',
    price: '',
  });

  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token'); // ✅ Get JWT from storage
  
    const response = await fetch('http://localhost:4242/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // ✅ Include the JWT in header
      },
      body: JSON.stringify({
        ownerName: formData.ownerName,
        dogName: formData.dogName,
        trainingProgram: formData.trainingProgram,
        price: parseFloat(formData.price),
      }),
    });
  
    const data = await response.json();
  
    if (data.url) {
      setCheckoutUrl(data.url);
      setShowOptions(true);
      setFormData({
        ownerName: '',
        dogName: '',
        trainingProgram: '',
        price: '',
      });
    } else {
      alert('Failed to generate payment link');
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-100 pt-10 px-4">
      <div className="mx-auto w-full max-w-md bg-white p-8 rounded shadow text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Primal Canine</h1>
        <img src="/logo.png" alt="Logo" className="w-32 h-32 mx-auto mb-6" />

        {showOptions ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Choose Payment Method</h2>

            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded mb-4"
            >
              Pay Now on This Device
            </a>

            <p className="text-gray-600 mb-2">or scan QR to pay on another device:</p>
            <div className="inline-block border p-4 rounded bg-white shadow">
              <QRCode value={checkoutUrl} size={180} />
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default InvoiceForm;
