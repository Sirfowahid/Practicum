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
import { useAddUserMutation, useUploadUserImageMutation } from "../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredential } from "../slices/authSlice";

interface UserData {
  name: string;
  email: string;
  password: string;
  mobileNo: string;
  nid: string;
  dob: string;
  address: string;
  image: File | null;
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
    image: null,
  });
  const [fileName, setFileName] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [uploadImageMutation] = useUploadUserImageMutation();
  const [addUser, { isLoading }] = useAddUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file ? file.name : ""); 
    const formData = new FormData();
    formData.append('image', file!);
    try {
      const res = await uploadImageMutation(formData).unwrap();
      setUserData((prevData) => ({
        ...prevData,
        image: res.image,
      }));
      toast.success("Image Uploaded.");
    } catch (error) {
      toast.error("Image upload failed.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await addUser(userData).unwrap();
      // dispatch(setCredential(res.data));
      toast.success("User Registered Successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to register user. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">User Registration</h2>
        </div>
        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { name: "name", type: "text", placeholder: "Name", icon: FaUser, label: "Full Name" },
              { name: "email", type: "email", placeholder: "Email address", icon: FaEnvelope, label: "Email" },
              { name: "password", type: "password", placeholder: "Password", icon: FaLock, label: "Password" },
              { name: "mobileNo", type: "tel", placeholder: "Mobile Number", icon: FaMobile, label: "Mobile Number" },
              { name: "nid", type: "text", placeholder: "NID", icon: FaIdCard, label: "National ID" },
              { name: "dob", type: "date", placeholder: "Date of Birth", icon: FaBirthdayCake, label: "Date of Birth" },
            ].map((field) => (
              <div key={field.name} className="relative flex flex-col">
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <div className="relative flex items-center">
                  <div className="flex items-center justify-center px-3 bg-gray-200 border border-r-0 border-gray-300 text-gray-500 rounded-l-lg h-12">
                    <field.icon className="h-6 w-6" />
                  </div>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required
                    className="flex-1 pl-4 py-3 w-full border border-gray-300 rounded-r-lg shadow-sm focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900 sm:text-sm h-12"
                    placeholder={field.placeholder}
                    value={userData[field.name as keyof UserData]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
            <div className="relative flex flex-col col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <div className="relative flex items-center">
                <div className="flex items-center justify-center px-3 bg-gray-200 border border-r-0 border-gray-300 text-gray-500 rounded-l-lg h-12">
                  <FaHome className="h-6 w-6" />
                </div>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="flex-1 pl-4 py-3 w-full border border-gray-300 rounded-r-lg shadow-sm focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900 sm:text-sm h-12"
                  placeholder="Address"
                  value={userData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Image
            </label>
            <label className="flex items-center cursor-pointer w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-200 text-gray-500 hover:bg-gray-300">
              <span className="flex-1">{fileName || "Select file"}</span>
              <FaImage className="ml-2 h-5 w-5" />
              <input
                id="image"
                name="image"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="p-6 text-center">
          Already have an account?{" "}
          <span className="text-blue-500">
            <Link to="/">Sign In</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
