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
import {
  useGetRoomDetailsQuery,
  useUpdateRoomMutation,
  useUploadRoomImageMutation,
} from "../../slices/roomsApiSlice";

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
  const { roomId } = useParams<{ roomId: string }>();
  const { data } = useGetRoomDetailsQuery(roomId);
  const [updateRoom] = useUpdateRoomMutation();
  const [uploadImageMutation] = useUploadRoomImageMutation();
  const room = data.room;

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
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

    if (!roomData.roomNumber || !roomData.title || roomData.price <= 0) {
      toast.error("Please fill out all required fields correctly.");
      return;
    }

    try {
      const res = await updateRoom({ _id: roomId, ...roomData }).unwrap();
      toast.success("Room Updated Successfully");
      navigate("/admin/rooms");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Update Room</h2>
        </div>
        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              {
                name: "roomNumber",
                type: "text",
                placeholder: "Room Number",
                icon: FaBed,
              },
              {
                name: "title",
                type: "text",
                placeholder: "Title",
                icon: FaInfoCircle,
              },
              {
                name: "price",
                type: "number",
                placeholder: "Price",
                icon: FaDollarSign,
              },
              {
                name: "bonus",
                type: "text",
                placeholder: "Bonus (optional)",
                icon: FaTags,
              },
              {
                name: "bedType",
                type: "text",
                placeholder: "Bed Type",
                icon: FaBed,
              },
              {
                name: "size",
                type: "text",
                placeholder: "Size (e.g., 28sqm)",
                icon: FaRulerCombined,
              },
              {
                name: "cancellationPolicy",
                type: "number",
                placeholder: "Cancellation Policy (hours)",
                icon: FaWarehouse,
              },
              {
                name: "discount",
                type: "number",
                placeholder: "Discount (optional)",
                icon: FaTags,
              },
            ].map((field) => (
              <div
                key={field.name}
                className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm"
              >
                <span className="flex items-center px-3 bg-gray-200 text-gray-500 h-full">
                  <field.icon className="h-5 w-5" />
                </span>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.name !== "bonus" && field.name !== "discount"}
                  className="pl-10 pr-4 py-3 w-full border-0 focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900 sm:text-sm"
                  placeholder={field.placeholder}
                  value={roomData[field.name as keyof RoomData]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          {/* Description Field */}
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <div className="relative flex items-start border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <textarea
              id="description"
              name="description"
              rows={5}
              required
              className="pl-10 pr-4 py-3 w-full border-0 focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900 sm:text-sm"
              placeholder="Description"
              value={roomData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
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

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="availability"
                checked={roomData.availability}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-gray-700">Available</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="wifi"
                checked={roomData.wifi}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-gray-700">WiFi</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="petsAllowed"
                checked={roomData.petsAllowed}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-gray-700">Pets Allowed</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="smokingPolicy"
                checked={roomData.smokingPolicy}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-gray-700">Smoking Allowed</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdateRoom;
