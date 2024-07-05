import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaBed,
  FaDollarSign,
  FaImage,
  FaInfoCircle,
  FaListUl,
  FaTags,
} from "react-icons/fa";
import FormInput from "../../components/ui/FormInput";
import axios from "axios";

interface FormValues {
  roomNo: string;
  title: string;
  roomType: string;
  image: FileList;
  facilities: string[];
  rentPerNight: number;
  bonus?: string;
  discount?: number;
}

const AdminUpdateRoom: React.FC = () => {
  const { roomId } = useParams();
  const methods = useForm<FormValues>();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append('roomNo', data.roomNo);
    formData.append('title', data.title);
    formData.append('roomType', data.roomType);
    formData.append('image', data.image[0]); // Handle file upload
    formData.append('facilities', JSON.stringify(data.facilities));
    formData.append('rentPerNight', data.rentPerNight.toString());
    if (data.bonus) formData.append('bonus', data.bonus);
    if (data.discount) formData.append('discount', data.discount.toString());
    console.log(data)
    // try {
    //   await axios.put(`/api/rooms/${roomId}`, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   });
    //   setShowModal(true);
    // } catch (error) {
    //   console.error('Error updating room:', error);
    // }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/admin/rooms");
  };

  return (
    <div className="flex justify-center my-4">
      <FormProvider {...methods}>
        <div className="w-2/3 mt-10 px-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-5 text-center">
              Update Room
            </h2>
            <button
              onClick={() => navigate("/admin/rooms")}
              className="bg-black px-6 text-white text-xl font-medium rounded"
            >
              Go Back
            </button>
          </div>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              name="roomNo"
              label="Room No"
              placeholder="Enter room number"
              rules={{ required: "Room No is required" }}
              icon={<FaBed />}
            />
            <FormInput
              name="title"
              label="Title"
              placeholder="Enter room title"
              rules={{ required: "Title is required" }}
              icon={<FaInfoCircle />}
            />
            <FormInput
              name="roomType"
              label="Room Type"
              placeholder="Enter room type"
              rules={{ required: "Room Type is required" }}
              icon={<FaListUl />}
            />
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Image
              </label>
              <div className="flex items-center">
                <FaImage className="mr-2 text-gray-600" />
                <input
                  id="image"
                  type="file"
                  {...methods.register("image")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Facilities
              </label>
              <div className="flex flex-wrap items-center space-x-4">
                {[
                  "washroom",
                  "balcony",
                  "petSupport",
                  "wifi",
                  "smokingArea",
                ].map((facility) => (
                  <label className="flex items-center" key={facility}>
                    <input
                      type="checkbox"
                      {...methods.register("facilities")}
                      value={facility}
                      className="form-checkbox"
                    />
                    <span className="ml-2 capitalize">{facility}</span>
                  </label>
                ))}
              </div>
            </div>
            <FormInput
              name="rentPerNight"
              label="Rent Per Night"
              type="number"
              placeholder="Enter rent per night"
              rules={{ required: "Rent per night is required" }}
              icon={<FaDollarSign />}
            />
            <FormInput
              name="bonus"
              label="Bonus"
              type="text"
              placeholder="Enter bonus facilities"
              icon={<FaTags />}
            />
            <FormInput
              name="discount"
              label="Discount"
              type="number"
              placeholder="Enter discount percentage"
              icon={<FaTags />}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Update Room
            </button>
          </form>
        </div>
      </FormProvider>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="fixed inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
          <div className="relative w-auto my-6 mx-auto max-w-sm">
            {/* Modal content */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex justify-center">
                <FaBed className="text-6xl text-blue-500" />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-xl font-bold mb-2">Room Updated!</h3>
                <p className="text-gray-700">
                  The room has been updated successfully.
                </p>
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={closeModal}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* End Modal */}
    </div>
  );
};

export default AdminUpdateRoom;
