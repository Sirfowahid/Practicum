// src/components/FormInput.tsx
import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  rules?: object;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  type = "text",
  placeholder = "",
  disabled = false,
  rules = {},
}) => {
  const { control, formState: { errors } } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const errorMessage = errors[name]?.message as string;

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className="mb-4 relative">
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div className="relative">
            <input
              id={name}
              type={type === 'password' && showPassword ? 'text' : type}
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors[name] ? "border-red-500" : ""
              }`}
            />
            {type === 'password' && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            )}
          </div>
        )}
      />
      {errorMessage && (
        <p className="text-red-500 text-xs italic">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormInput;
