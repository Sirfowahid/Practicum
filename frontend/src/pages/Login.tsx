import React from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInput from '../components/ui/FormInput';
import { FaEnvelope, FaLock ,FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const methods = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = data => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h1 className='font-bold text-4xl text-center my-4'>Login Form</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              rules={{ required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Email is invalid" } }}
              icon={<FaEnvelope/>}
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              rules={{ required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } }}
              icon={<FaLock/>}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Login
            </button>
          </form>
        </FormProvider>
        <div className="mt-4 text-center">
          <span className="text-gray-700">Don't have an account? </span>
          <Link to="/signup" className="text-blue-500 hover:underline">
            Create New
          </Link>
        </div>
        <div className="mt-8">
          <h3 className="text-center text-gray-600">Follow us on</h3>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://facebook.com" className="text-gray-500 hover:text-blue-600">
              <FaFacebook size="24" />
            </a>
            <a href="https://twitter.com" className="text-gray-500 hover:text-blue-400">
              <FaTwitter size="24" />
            </a>
            <a href="https://instagram.com" className="text-gray-500 hover:text-pink-500">
              <FaInstagram size="24" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
