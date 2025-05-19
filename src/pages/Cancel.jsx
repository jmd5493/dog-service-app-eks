import React from 'react';

const Cancel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Payment Canceled</h1>
      <p className="mb-6">Your payment was not completed. You can return and try again when ready.</p>
      <a href="/" className="text-blue-600 hover:underline">Go back to form</a>
    </div>
  );
};

export default Cancel;
