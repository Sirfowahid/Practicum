import React from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInput from '../components/ui/FormInput';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const methods = useForm<SignUpFormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = data => {
    console.log(data);
    // Replace with your sign-up logic (e.g., API call, etc.)
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className='font-bold text-4xl text-center my-4'>Sign Up</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormInput
              name="username"
              label="Username"
              type="text"
              placeholder="Enter your username"
              rules={{ required: "Username is required" }}
              icon={<FaUser />}
            />
            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              rules={{ required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" } }}
              icon={<FaEnvelope />}
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              rules={{ required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } }}
              icon={<FaLock />}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Sign Up
            </button>
          </form>
        </FormProvider>
        <div className="mt-4 text-center">
          <span className="text-gray-700">Already have an account? </span>
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
