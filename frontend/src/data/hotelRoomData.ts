import r1 from "../assets/home/room1.jpg";
import r2 from "../assets/home/room2.jpg";
import r3 from "../assets/home/room3.jpg";
import r4 from "../assets/home/room4.jpg";
import r5 from "../assets/home/room5.jpg";
import r6 from "../assets/home/room6.jpg";
import r7 from "../assets/home/room7.jpg";
import r8 from "../assets/home/room8.jpg";
import r9 from "../assets/home/room9.jpg";
import r10 from "../assets/home/room10.jpg";

export interface HotelRoom {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
  bonus?: string;
  availability: boolean;
  rating: number;
  bedType: string;
  size: string;
  wifi: boolean;
  petsAllowed: boolean;
  smokingPolicy: string;
  cancellationPolicy: string;
  checkInOutTimes: string;
}

const hotelRoomData: HotelRoom[] = [
  {
    id: 1,
    image: r1,
    title: "Deluxe Room",
    description: "A comfortable room with a beautiful view. The Deluxe Room offers modern decor and luxurious furnishings, creating a perfect blend of comfort and style. Enjoy the scenic views from the large windows while relaxing in the cozy king-sized bed. Ideal for both leisure and business travelers.",
    price: "$120/night",
    bonus: "Free breakfast",
    availability: true,
    rating: 4.5,
    bedType: "King",
    size: "35 sqm",
    wifi: true,
    petsAllowed: false,
    smokingPolicy: "Non-smoking",
    cancellationPolicy: "Free cancellation within 24 hours of booking",
    checkInOutTimes: "Check-in: 3 PM, Check-out: 11 AM",
  },
  {
    id: 2,
    image: r2,
    title: "Standard Room",
    description: "A cozy room perfect for a short stay. The Standard Room is designed to offer a pleasant and comfortable experience with all essential amenities. It features a queen-sized bed, a work desk, and a private bathroom. Perfect for solo travelers or couples looking for a budget-friendly option.",
    price: "$80/night",
    availability: true,
    rating: 4.0,
    bedType: "Queen",
    size: "25 sqm",
    wifi: true,
    petsAllowed: true,
    smokingPolicy: "Non-smoking",
    cancellationPolicy: "Free cancellation within 48 hours of booking",
    checkInOutTimes: "Check-in: 2 PM, Check-out: 12 PM",
  },
  {
    id: 3,
    image: r3,
    title: "Suite",
    description: "A luxurious suite with all amenities. The Suite offers an exceptional experience with its spacious layout and premium furnishings. It includes a separate living area, a bedroom with a king-sized bed, and a lavish bathroom with a jacuzzi. Enjoy exclusive amenities and complimentary spa access for a truly memorable stay.",
    price: "$200/night",
    bonus: "Complimentary spa access",
    availability: false,
    rating: 4.8,
    bedType: "King",
    size: "50 sqm",
    wifi: true,
    petsAllowed: false,
    smokingPolicy: "Non-smoking",
    cancellationPolicy: "Non-refundable",
    checkInOutTimes: "Check-in: 3 PM, Check-out: 11 AM",
  },
  {
    id: 4,
    image: r4,
    title: "Executive Room",
    description: "Spacious room with executive amenities. The Executive Room is designed for business travelers, offering ample space and modern amenities. It features a comfortable king-sized bed, a large work desk, and access to the executive lounge. Enjoy a productive stay with complimentary high-speed internet and business services.",
    price: "$150/night",
    bonus: "Access to executive lounge",
    availability: true,
    rating: 4.6,
    bedType: "King",
    size: "40 sqm",
    wifi: true,
    petsAllowed: false,
    smokingPolicy: "Non-smoking",
    cancellationPolicy: "Free cancellation within 24 hours of booking",
    checkInOutTimes: "Check-in: 3 PM, Check-out: 11 AM",
  },
  {
    id: 5,
    image: r5,
    title: "Family Room",
    description: "Ideal room for a family vacation. The Family Room provides ample space for a comfortable family stay. It includes two queen-sized beds, a seating area, and a large bathroom. Designed to accommodate families, this room ensures a pleasant and enjoyable experience for both parents and children.",
    price: "$130/night",
    availability: true,
    rating: 4.3,
    bedType: "Queen",
    size: "45 sqm",
    wifi: true,
    petsAllowed: true,
    smokingPolicy: "Non-smoking",
    cancellationPolicy: "Free cancellation within 48 hours of booking",
    checkInOutTimes: "Check-in: 2 PM, Check-out: 12 PM",
  },
  {
    id: 6,
    image: r6,
    title: "Single Room",
    description: "Perfect for solo travelers. The Single Room offers a cozy and private space for solo travelers. It features a comfortable single bed, a work desk, and an en-suite bathroom. Ideal for guests seeking a budget-friendly option without compromising on comfort.",
    price: "$70/night",
    availability: true,
    rating: 4.1,
    bedType: "Single",
    size: "20 sqm",
    wifi: true,
    petsAllowed: false,
    smokingPolicy: "Non-smoking",
    cancellationPolicy: "Free cancellation within 24 hours of booking",
    checkInOutTimes: "Check-in: 3 PM, Check-out: 11 AM",
  },
  {
    id: 7,
    image: r7,
    title: "Double Room",
    description: "Comfortable room for two guests. The Double Room is perfect for couples or friends traveling together. It features a double bed, a seating area, and modern amenities. Enjoy a relaxing stay with complimentary parking and easy access to hotel facilities.",
    price: "$100/night",
    bonus: "Free parking",
    availability: false,
    rating: 4.4,
    bedType: "Double",
    size: "30 sqm",
    wifi: true,
    petsAllowed: false,
    smokingPolicy: "Non-smoking",
    cancellationPolicy: "Free cancellation within 48 hours of booking",
    checkInOutTimes: "Check-in: 2 PM, Check-out: 12 PM",
  },
  {
    id: 8,
    image: r8,
    title: "Honeymoon Suite",
    description: "A romantic suite for newlyweds. The Honeymoon Suite offers an intimate and luxurious setting for newlyweds. It features a spacious layout with a king-sized bed, a private balcony, and a luxurious bathroom with a jacuzzi. Celebrate your special moments with complimentary champagne and a romantic ambiance.",
    price: "$250/night",
    bonus: "Free champagne",
    availability: true,
    rating: 4.9,
    bedType: "King",
    size: "60 sqm",
    wifi: true,
    petsAllowed: false,
    smokingPolicy: "Non-smoking",
    cancellationPolicy: "Non-refundable",
    checkInOutTimes: "Check-in: 3 PM, Check-out: 11 AM",
  },
  {
    id: 9,
    image: r9,
    title: "Business Room",
    description: "Room with business facilities. The Business Room is tailored for business travelers, offering modern amenities and a comfortable workspace. It features a queen-sized bed, a large desk, and high-speed internet access. Make the most of your business trip with our dedicated services and facilities.",
    price: "$140/night",
    availability: true,
    rating: 4.7,
    bedType: "Queen",
    size: "35 sqm",
    wifi: true,
    petsAllowed: false,
    smokingPolicy: "Non-smoking",
    cancellationPolicy: "Free cancellation within 24 hours of booking",
    checkInOutTimes: "Check-in: 3 PM, Check-out: 11 AM",
  },
  {
    id: 10,
    image: r10,
    title: "Deluxe Room",
    description: "A comfortable room with a beautiful view. The Deluxe Room offers modern decor and luxurious furnishings, creating a perfect blend of comfort and style. Enjoy the scenic views from the large windows while relaxing in the cozy king-sized bed. Ideal for both leisure and business travelers.",
    price: "$120/night",
    bonus: "Free breakfast",
    availability: false,
    rating: 4.5,
    bedType: "King",
    size: "35 sqm",
    wifi: true,
    petsAllowed: false,
    smokingPolicy: "Non-smoking",
    cancellationPolicy: "Free cancellation within 24 hours of booking",
    checkInOutTimes: "Check-in: 3 PM, Check-out: 11 AM",
  },
];

export default hotelRoomData;
