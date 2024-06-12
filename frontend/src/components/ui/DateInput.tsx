import React from 'react';

interface DateInputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateInput = ({ label, value, onChange }: DateInputProps) => {
  return (
    <div className="flex items-center bg-white rounded px-4 space-x-2 p-2">
      <label className="font-semibold text-xl text-gray-600">{label}</label>
      <input
        type="date"
        value={value}
        onChange={onChange}
        className="p-2 text-gray-700 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
    </div>
  );
};

export default DateInput;
