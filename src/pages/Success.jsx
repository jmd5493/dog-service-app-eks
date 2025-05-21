// src/pages/Success.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  const [showReturn, setShowReturn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('stripeCheckoutStarted')) {
      setShowReturn(true);
      localStorage.removeItem('stripeCheckoutStarted');
    }
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">🎉 Payment Successful!</h1>
      <p>Thank you!</p>
      {showReturn && (
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-semibold transition"
        >
          Return to Invoice
        </button>
      )}
    </div>
  );
};

export default Success;
