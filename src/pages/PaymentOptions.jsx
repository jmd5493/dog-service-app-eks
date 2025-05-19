import React from 'react';
import QRCode from 'qrcode.react';

const PaymentOptions = ({ paymentUrl }) => {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold text-white">Choose Payment Method</h2>

      <a
        href={paymentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
      >
        Pay Now
      </a>

      <div>
        <p className="text-white mt-4">Or scan to pay on another device:</p>
        <QRCode value={paymentUrl} size={200} />
      </div>
    </div>
  );
};

export default PaymentOptions;
