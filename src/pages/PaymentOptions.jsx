import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';

const PaymentOptions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const checkoutUrl = location.state?.checkoutUrl;

  // If no checkoutUrl, redirect back to form
  React.useEffect(() => {
    if (!checkoutUrl) {
      navigate('/');
    }
  }, [checkoutUrl, navigate]);

  if (!checkoutUrl) return null;

  const handlePayNow = () => {
    localStorage.setItem('stripeCheckoutStarted', 'yes');
    window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow text-center relative">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm"
        >
          Back
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Choose Payment Method</h2>
        <button
          onClick={handlePayNow}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded mb-4"
        >
          Pay Now on This Device
        </button>
        <p className="text-gray-600 mb-2">or scan QR to pay on another device:</p>
        <div className="inline-block border p-4 rounded bg-white shadow">
          <QRCode value={checkoutUrl} size={180} />
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
