import React from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import FormInput from '../components/ui/FormInput';

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
        <h2 className="text-2xl font-bold text-center mb-6">Login Form</h2>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              rules={{ required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Email is invalid" } }}
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              rules={{ required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } }}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Login
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Login;
