import React, { useState, useEffect } from "react";
import {
  FaBed,
  FaDollarSign,
  FaImage,
  FaInfoCircle,
  FaRulerCombined,
  FaTags,
  FaWarehouse,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetRoomDetailsQuery, useUpdateRoomMutation, useUploadRoomImageMutation } from "../../slices/roomsApiSlice";

interface RoomData {
  roomNumber: string;
  title: string;
  description: string;
  price: number;
  bonus: string;
  availability: boolean;
  wifi: boolean;
  bedType: string;
  size: string;
  petsAllowed: boolean;
  smokingPolicy: boolean;
  cancellationPolicy: number;
  discount: number;
  image: string;
}

const AdminUpdateRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>(); // Get room id from URL
  const { data } = useGetRoomDetailsQuery(roomId); // Fetch room details
  const [updateRoom] = useUpdateRoomMutation(); // Mutation for updating the room
  const [uploadImageMutation] = useUploadRoomImageMutation(); // Mutation for uploading images
  const room = data.room;
  console.log(roomId)
  const [roomData, setRoomData] = useState<RoomData>({
    roomNumber: "",
    title: "",
    description: "",
    price: 0,
    bonus: "",
    availability: true,
    wifi: true,
    bedType: "",
    size: "",
    petsAllowed: false,
    smokingPolicy: false,
    cancellationPolicy: 0,
    discount: 0,
    image: "",
  });

  const [fileName, setFileName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (room) {
      setRoomData({
        roomNumber: room.roomNumber || "",
        title: room.title || "",
        description: room.description || "",
        price: room.price || 0,
        bonus: room.bonus || "",
        availability: room.availability ?? true,
        wifi: room.wifi ?? true,
        bedType: room.bedType || "",
        size: room.size || "",
        petsAllowed: room.petsAllowed ?? false,
        smokingPolicy: room.smokingPolicy ?? false,
        cancellationPolicy: room.cancellationPolicy || 0,
        discount: room.discount || 0,
        image: room.image || "",
      });
      setFileName(room.image ? room.image.split("/").pop() : "");
    }
  }, [room]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: finalValue,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file ? file.name : "");

    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await uploadImageMutation(formData).unwrap();
        setRoomData((prevData) => ({
          ...prevData,
          image: res.image,
        }));
        toast.success("Image Uploaded.");
      } catch (error) {
        toast.error("Image upload failed.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(roomData); // Debug: Check the roomData content
  
    // Validate required fields
    if (!roomData.roomNumber || !roomData.title || roomData.price <= 0) {
      toast.error("Please fill out all required fields correctly.");
      return;
    }
  
    try {
      const res = await updateRoom({ _id:roomId, ...roomData }).unwrap(); // Send roomData to the backend
      console.log(res); // Debug: Check the response from the backend
      toast.success("Room Updated Successfully");
  
      // Reset form data (if needed)
      navigate("/admin/rooms"); // Navigate to the rooms list page
    } catch (error) {
      console.error("Error updating room:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-4 px-2 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Update Room</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {[
              { name: "roomNumber", type: "text", placeholder: "Room Number", icon: FaBed },
              { name: "title", type: "text", placeholder: "Title", icon: FaInfoCircle },
              { name: "description", type: "text", placeholder: "Description", icon: FaInfoCircle },
              { name: "price", type: "number", placeholder: "Price", icon: FaDollarSign },
              { name: "bonus", type: "text", placeholder: "Bonus (optional)", icon: FaTags },
              { name: "bedType", type: "text", placeholder: "Bed Type", icon: FaBed },
              { name: "size", type: "text", placeholder: "Size (e.g., 28sqm)", icon: FaRulerCombined },
              { name: "cancellationPolicy", type: "number", placeholder: "Cancellation Policy (hours)", icon: FaWarehouse },
              { name: "discount", type: "number", placeholder: "Discount (optional)", icon: FaTags },
            ].map((field) => (
              <div key={field.name} className="mb-4">
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
                    required={field.name !== "bonus" && field.name !== "discount"}
                    className="appearance-none rounded-r-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder={field.placeholder}
                    value={roomData[field.name as keyof RoomData] ?? ""} // Ensure no undefined values
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}

            {/* Image Upload */}
            <div className="mb-4">
              <label htmlFor="image" className="sr-only">
                Image
              </label>
              <div className="flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <FaImage className="h-5 w-5" />
                </span>
                <div className="flex flex-col w-full">
                  <label className="flex justify-between items-center px-3 py-2 bg-white border border-gray-300 rounded-md cursor-pointer text-sm text-gray-500 hover:bg-gray-50">
                    <span>{fileName || "Select file"}</span>
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
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="availability"
                  checked={roomData.availability}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Available</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="wifi"
                  checked={roomData.wifi}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span className="ml-2">WiFi</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="petsAllowed"
                  checked={roomData.petsAllowed}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Pets Allowed</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="smokingPolicy"
                  checked={roomData.smokingPolicy}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Smoking Allowed</span>
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdateRoom;
