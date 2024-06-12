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
  image: string;
  title: string;
  description: string;
  price: string;
  bonus?: string;
}

const hotelRoomData: HotelRoom[] = [
  {
    image: r1,
    title: "Deluxe Room",
    description: "A comfortable room with a beautiful view.",
    price: "$120/night",
    bonus: "Free breakfast",
  },
  {
    image: r2,
    title: "Standard Room",
    description: "A cozy room perfect for a short stay.",
    price: "$80/night",
  },
  {
    image: r3,
    title: "Suite",
    description: "A luxurious suite with all amenities.",
    price: "$200/night",
    bonus: "Complimentary spa access",
  },
  {
    image: r4,
    title: "Executive Room",
    description: "Spacious room with executive amenities.",
    price: "$150/night",
    bonus: "Access to executive lounge",
  },
  {
    image: r5,
    title: "Family Room",
    description: "Ideal room for a family vacation.",
    price: "$130/night",
  },
  {
    image: r6,
    title: "Single Room",
    description: "Perfect for solo travelers.",
    price: "$70/night",
  },
  {
    image: r7,
    title: "Double Room",
    description: "Comfortable room for two guests.",
    price: "$100/night",
    bonus: "Free parking",
  },
  {
    image: r8,
    title: "Honeymoon Suite",
    description: "A romantic suite for newlyweds.",
    price: "$250/night",
    bonus: "Free champagne",
  },
  {
    image: r9,
    title: "Business Room",
    description: "Room with business facilities.",
    price: "$140/night",
  },
  {
    image: r5,
    title: "Family Room",
    description: "Ideal room for a family vacation.",
    price: "$130/night",
  },
  {
    image: r6,
    title: "Single Room",
    description: "Perfect for solo travelers.",
    price: "$70/night",
  },
  {
    image: r7,
    title: "Double Room",
    description: "Comfortable room for two guests.",
    price: "$100/night",
    bonus: "Free parking",
  },
  {
    image: r8,
    title: "Honeymoon Suite",
    description: "A romantic suite for newlyweds.",
    price: "$250/night",
    bonus: "Free champagne",
  },
  {
    image: r9,
    title: "Business Room",
    description: "Room with business facilities.",
    price: "$140/night",
  },
  {
    image: r1,
    title: "Deluxe Room",
    description: "A comfortable room with a beautiful view.",
    price: "$120/night",
    bonus: "Free breakfast",
  },
  {
    image: r2,
    title: "Standard Room",
    description: "A cozy room perfect for a short stay.",
    price: "$80/night",
  },
  {
    image: r3,
    title: "Suite",
    description: "A luxurious suite with all amenities.",
    price: "$200/night",
    bonus: "Complimentary spa access",
  },
  {
    image: r4,
    title: "Executive Room",
    description: "Spacious room with executive amenities.",
    price: "$150/night",
    bonus: "Access to executive lounge",
  },
];

export default hotelRoomData;
