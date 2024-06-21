import React from 'react';

interface DateInputProps {
  label: string;
  register:{name:string}
}

const DateInput = ({ label,register }: DateInputProps) => {
  return (
    <div className="flex items-center bg-white rounded px-4 space-x-2 p-2">
      <label className="font-semibold text-xl text-gray-600">{label}</label>
      <input
        type="date"
        required
        {...register}
        className="p-2 text-gray-700 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
    </div>
  );
};

export default DateInput;
