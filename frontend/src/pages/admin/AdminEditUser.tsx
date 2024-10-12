import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaMobile,
  FaIdCard,
  FaBirthdayCake,
  FaHome,
  FaImage,
} from "react-icons/fa";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useUploadUserImageMutation,
} from "../../slices/usersApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/ui/Loading";

interface UserData {
  name: string;
  email: string;
  mobileNo: string;
  nid: string;
  dob: string;
  address: string;
  image: string | null;
  role: string;
}

const AdminEditUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const { data: user, isLoading: isFetching, isError: fetchError, refetch } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [uploadImageMutation] = useUploadUserImageMutation();

  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    mobileNo: "",
    nid: "",
    dob: "",
    address: "",
    image: null,
    role: "user", 
  });
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    if (user) {
      const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      setUserData({
        name: user.user.name,
        email: user.user.email,
        mobileNo: user.user.mobileNo,
        nid: user.user.nid,
        dob: user.user.dob ? formatDate(user.user.dob) : "",
        address: user.user.address,
        image: user.user.image,
        role: user.user.role, 
      });
      setFileName(user.user.image ? user.user.image.split("/").pop() : "");
    }
  }, [user]);

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
    formData.append("image", file);

    try {
      const res = await uploadImageMutation(formData).unwrap();
      setUserData((prevData) => ({
        ...prevData,
        image: res.image,
      }));
      toast.success("Image Uploaded.");
    } catch (error) {
      toast.error("Image upload failed. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await updateUser({ _id: userId, ...userData }).unwrap();
      toast.success("User Updated Successfully");
      refetch();
      navigate("/admin/users");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user. Please try again.");
    }
  };

  if (isFetching) return <LoadingSpinner />;
  if (fetchError) return <p>Failed to fetch user data. Please try again later.</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Update User Information</h2>
        </div>
        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { name: "name", type: "text", placeholder: "Name", icon: FaUser },
              { name: "email", type: "email", placeholder: "Email address", icon: FaEnvelope },
              { name: "mobileNo", type: "tel", placeholder: "Mobile Number", icon: FaMobile },
              { name: "nid", type: "text", placeholder: "NID", icon: FaIdCard },
              { name: "dob", type: "date", placeholder: "Date of Birth", icon: FaBirthdayCake },
              { name: "address", type: "text", placeholder: "Address", icon: FaHome },
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
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="reception">Reception</option>
            </select>
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
            {isUpdating ? "Updating..." : "Update Information"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditUser;
