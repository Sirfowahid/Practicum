// src/pages/Contact.tsx
import React from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { FaUser, FaEnvelope, FaPaperPlane, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import FormInput from '../components/ui/FormInput';

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const methods = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = data => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h1 className='font-bold text-4xl text-center my-4'>Contact Us</h1>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormInput
              name="name"
              label="Name"
              type="text"
              placeholder="Your Name"
              rules={{ required: "Name is required" }}
              icon={<FaUser />}
            />
            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="Your Email"
              rules={{ required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Email is invalid" } }}
              icon={<FaEnvelope />}
            />
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <textarea
                  id="message"
                  {...methods.register('message', { required: "Message is required" })}
                  rows={4}
                  className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Your Message"
                ></textarea>
              </div>
              {methods.formState.errors.message && (
                <p className="text-red-500 text-xs italic">{methods.formState.errors.message.message}</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaPaperPlane className="mr-2" /> Send Message
              </button>
            </div>
          </form>
        </FormProvider>
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

export default Contact;
