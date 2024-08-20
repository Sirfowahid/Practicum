import HotelRoomImages from "../../components/ui/HotelRoomImages";
import { useNavigate } from "react-router-dom";
const RecepRooms = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
      
      <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-6xl mt-6">
          <HotelRoomImages role="reception" />
        </div>
      </div>
    </div>
  );
};

export default RecepRooms;
