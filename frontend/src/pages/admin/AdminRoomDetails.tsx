import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetRoomDetailsQuery } from "../../slices/roomsApiSlice";
import LoadingSpinner from "../../components/ui/Loading";
import ErrorDisplay from "../../components/ui/Error";
import roomImg from "../../assets/home/room1.jpg"
import {
  FaCheckCircle,
  FaTimesCircle,
  FaWifi,
  FaBed,
  FaRulerCombined,
  FaDog,
  FaSmokingBan,
  FaSmoking,
} from "react-icons/fa";
import hotelRoomData, { HotelRoom } from "../../data/hotelRoomData";

const AdminRoomDetails = () => {
  const { roomId } = useParams<{ roomId?: string }>();
  const navigate = useNavigate();

  if (!roomId) {
    return (
      <ErrorDisplay message="Room ID not provided" />
    );
  }

  const { data, isLoading, error } = useGetRoomDetailsQuery(roomId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return <ErrorDisplay message="Room not found" />;
  }

  const room = data.room;
  const fullImageUrl = `http://localhost:5000${room.image}` || roomImg;

  if (!room) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        Room not found
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen mx-4">
      <div className="container mx-auto py-8">
        <div className="max-w-full mx-auto bg-white overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                src={fullImageUrl}
                alt={room.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:w-1/2 flex flex-col justify-between">
              <div>
                <p className="text-gray-700 text-6xl mb-8">
                  <strong>{room.title}</strong>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Room Details:</strong> {room.description}
                </p>
                <p className="text-gray-700 text-4xl mb-2">
                  <strong>Price:</strong> {room.price}
                </p>
                {room.bonus && (
                  <p className="text-green-600 mb-2 font-medium text-xl">
                    <strong>Bonus:</strong> {room.bonus}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <span className="text-gray-700 mr-2">
                    <strong>Availability:</strong>
                  </span>
                  {room.availability ? (
                    <span className="text-green-500 flex items-center">
                      <FaCheckCircle className="mr-1" /> Available
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <FaTimesCircle className="mr-1" /> Unavailable
                    </span>
                  )}
                </div>

                <div className="flex items-center mb-2">
                  <FaWifi className="text-gray-700 mr-2" />
                  <span className="text-gray-700">
                    {room.wifi ? "Free Wi-Fi" : "No Wi-Fi"}
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  <FaBed className="text-gray-700 mr-2" />
                  <span className="text-gray-700">
                    <strong>Bed Type:</strong> {room.bedType}
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  <FaRulerCombined className="text-gray-700 mr-2" />
                  <span className="text-gray-700">
                    <strong>Room Size:</strong> {room.size}
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  {room.petsAllowed ? (
                    <FaDog className="text-gray-700 mr-2" />
                  ) : (
                    <FaDog className="text-gray-400 mr-2" />
                  )}
                  <span className="text-gray-700">
                    {room.petsAllowed ? "Pets Allowed" : "No Pets Allowed"}
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  {room.smokingPolicy === "Non-smoking" ? (
                    <FaSmokingBan className="text-gray-700 mr-2" />
                  ) : (
                    <FaSmoking className="text-gray-700 mr-2" />
                  )}
                  <span className="text-gray-700">
                    <strong>Smoking Policy:</strong> {room.smokingPolicy}
                  </span>
                </div>

                <div className="text-gray-700 mb-2">
                  <strong>Cancellation Policy:</strong>{" "}
                  {room.cancellationPolicy}
                </div>
                <button
                  className="btn btn-primary bg-blue-500 text-white px-4 py-2 font-medium text-2xl hover:bg-blue-700 transition-colors rounded my-4"
                  type="submit"
                  onClick={() => navigate("/admin/updateroom/1")}
                >
                  Edit Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRoomDetails;
