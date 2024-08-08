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
import { useGetUserDetailsQuery, useUpdateUserMutation, useUploadUserImageMutation } from "../../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
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
}

const AdminEditUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: user, isLoading: isFetching, isError: fetchError,refetch } = useGetUserDetailsQuery(userId);
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
  });
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    if (user) {
      const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
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
      });
      setFileName(user.user.image ? user.user.image.split('/').pop() : "");
    }
  }, [user]);

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
      refetch()
      navigate("/admin/users");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user. Please try again.");
    }
  };

  if (isFetching) return <LoadingSpinner />;
  if (fetchError) return <p>Failed to fetch user data. Please try again later.</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Update User Information
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {[
              { name: "name", type: "text", placeholder: "Name", icon: FaUser },
              {
                name: "email",
                type: "email",
                placeholder: "Email address",
                icon: FaEnvelope,
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
                placeholder: "Image",
                icon: FaImage,
              },
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label htmlFor={field.name} className="sr-only">
                  {field.placeholder}
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    <field.icon className="h-5 w-5" />
                  </span>
                  {field.type !== "file" ? (
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
                  ) : (
                    <div className="flex flex-col w-full">
                      <label className="flex justify-between items-center px-3 py-2 bg-white border border-gray-300 rounded-md cursor-pointer text-sm text-gray-500 hover:bg-gray-50">
                        <span>{fileName || "Select file"}</span>
                        <FaImage className="ml-2 h-5 w-5" />
                        <input
                          id={field.name}
                          name={field.name}
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              {isUpdating ? <LoadingSpinner /> : "Update Information"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditUser;
