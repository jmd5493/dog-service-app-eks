import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
  const navigate = useNavigate();
  const [showReturn, setShowReturn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('stripeCheckoutStarted')) {
      setShowReturn(true);
      localStorage.removeItem('stripeCheckoutStarted');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Payment Canceled</h1>
      <p className="mb-6">Your payment was not completed. Please Scan Again</p>
      {showReturn && (
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold transition"
        >
          Return to Invoice
        </button>
      )}
    </div>
  );
};

export default Cancel;
