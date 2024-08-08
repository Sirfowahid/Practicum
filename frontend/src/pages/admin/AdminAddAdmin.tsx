import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaMobile,
  FaIdCard,
  FaBirthdayCake,
  FaImage,
} from "react-icons/fa";
import { useAddUserMutation, useUploadUserImageMutation } from "../../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


interface UserData {
  name: string;
  email: string;
  password: string;
  mobileNo: string;
  nid: string;
  dob: string;
  address: string;
  image: File | null;
  isAdmin: boolean;
  role: string;
}

const AdminAddAdmin: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    mobileNo: "",
    nid: "",
    dob: "",
    address: "",
    image: null,
    isAdmin: true,
    role: "user",
  });
  const [fileName, setFileName] = useState<string>("");

  const navigate = useNavigate();
  

  const [uploadImageMutation] = useUploadUserImageMutation();
  const [addUser, { isLoading }] = useAddUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    formData.append('image', file);
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
      //dispatch(setCredential(res.data));
      toast.success("User Registered");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to register user. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Admin Registration</h2>
        </div>
        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { name: "name", type: "text", placeholder: "Name", icon: FaUser },
              { name: "email", type: "email", placeholder: "Email address", icon: FaEnvelope },
              { name: "password", type: "password", placeholder: "Password", icon: FaLock },
              { name: "mobileNo", type: "tel", placeholder: "Mobile Number", icon: FaMobile },
              { name: "nid", type: "text", placeholder: "NID", icon: FaIdCard },
              { name: "dob", type: "date", placeholder: "Date of Birth", icon: FaBirthdayCake },
            ].map((field) => (
              <div key={field.name} className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <span className="flex items-center px-3 bg-gray-200 text-gray-500 h-full">
                  <field.icon className="h-5 w-5" />
                </span>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required
                  className="pl-10 pr-4 py-3 w-full border-0 focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900 sm:text-sm"
                  placeholder={field.placeholder}
                  value={userData[field.name as keyof UserData]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900 sm:text-sm"
              placeholder="Address"
              value={userData.address}
              onChange={handleChange}
            />
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
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="reception">Reception</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            {isLoading ? "Registering..." : "Add Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddAdmin;
