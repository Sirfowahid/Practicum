import React from 'react';

type ErrorDisplayProps = {
  message: string;
};

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-red-100">
      <div className="bg-white p-6 rounded-lg shadow-lg border border-red-400 text-red-700">
        <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorDisplay;
