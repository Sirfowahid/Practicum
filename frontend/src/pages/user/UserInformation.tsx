import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaUserFriends,
  FaHome,
  FaIdCard,
} from "react-icons/fa";
import FormInput from "../../components/ui/FormInput";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  nid: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  address: string;
}

const UserInformation: React.FC = () => {
  const navigate = useNavigate()
  const methods = useForm<FormValues>();
  
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center my-4">
      <FormProvider {...methods}>
        <div className="w-2/3 mt-10 px-4">
        <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-5 text-center">
              User Information
            </h2>
            <button
              onClick={() => navigate("/user/rooms")}
              className="bg-black px-6 text-white text-xl font-medium rounded"
            >
              Go Back
            </button>
          </div>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              name="name"
              label="Name"
              placeholder="Enter your name"
              rules={{ required: "Name is required" }}
              icon={<FaUser />}
            />
            <FormInput
              name="email"
              label="Email"
              placeholder="Enter your email"
              rules={{ required: "Email is required" }}
              icon={<FaEnvelope />}
            />
            <FormInput
              name="phone"
              label="Phone"
              placeholder="Enter your phone number"
              rules={{ required: "Phone number is required" }}
              icon={<FaPhone />}
            />
            <FormInput
              name="nid"
              label="NID Number"
              placeholder="Enter your NID number"
              rules={{ required: "NID number is required" }}
              icon={<FaIdCard />}
            />
            <FormInput
              name="checkInDate"
              label="Check-In Date"
              type="date"
              rules={{ required: "Check-In Date is required" }}
              icon={<FaCalendarAlt />}
            />
            <FormInput
              name="checkOutDate"
              label="Check-Out Date"
              type="date"
              rules={{ required: "Check-Out Date is required" }}
              icon={<FaCalendarAlt />}
            />
            <FormInput
              name="guests"
              label="Number of Guests"
              type="number"
              placeholder="Enter number of guests"
              rules={{ required: "Number of guests is required" }}
              icon={<FaUserFriends />}
            />
            <FormInput
              name="address"
              label="Address"
              placeholder="Enter your address"
              icon={<FaHome />}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Submit Information
            </button>
          </form>
        </div>
      </FormProvider>
    </div>
  );
};

export default UserInformation;
