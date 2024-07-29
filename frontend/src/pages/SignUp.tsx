import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaMobile,
  FaIdCard,
  FaBirthdayCake,
  FaHome,
  FaImage,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface UserData {
  name: string;
  email: string;
  password: string;
  mobileNo: string;
  nid: string;
  dob: string;
  address: string;
  image: string;
  //isAdmin: boolean;
}

const UserForm: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    mobileNo: "",
    nid: "",
    dob: "",
    address: "",
    image: "",
    //isAdmin: false,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            User Registration
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {" "}
            {/* Added space-y-4 for vertical spacing */}
            {[
              { name: "name", type: "text", placeholder: "Name", icon: FaUser },
              {
                name: "email",
                type: "email",
                placeholder: "Email address",
                icon: FaEnvelope,
              },
              {
                name: "password",
                type: "password",
                placeholder: "Password",
                icon: FaLock,
              },
              {
                name: "mobileNo",
                type: "tel",
                placeholder: "Mobile Number",
                icon: FaMobile,
              },
              { name: "nid", type: "text", placeholder: "NID", icon: FaIdCard },
              {
                name: "dob",
                type: "date",
                placeholder: "Date of Birth",
                icon: FaBirthdayCake,
              },
              {
                name: "address",
                type: "text",
                placeholder: "Address",
                icon: FaHome,
              },
              {
                name: "image",
                type: "file",
                placeholder: "Image URL",
                icon: FaImage,
              },
            ].map((field, index) => (
              <div key={field.name} className="mb-4">
                {" "}
                {/* Added mb-4 for bottom margin */}
                <label htmlFor={field.name} className="sr-only">
                  {field.placeholder}
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    <field.icon className="h-5 w-5" />
                  </span>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required
                    className="appearance-none rounded-r-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder={field.placeholder}
                    value={userData[field.name as keyof UserData]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
