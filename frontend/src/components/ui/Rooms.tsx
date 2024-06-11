import React from "react";
import room1 from "../../assets/home/room1.jpg";
import room2 from "../../assets/home/room2.jpg";
import room3 from "../../assets/home/room3.jpg";
import room4 from "../../assets/home/room4.jpg";
import Gallery from "./Gallery";
import Title from "./Title";
import Container from "./Container";
const Rooms = () => {
    const rooms = [
        { src: room1, caption: "Cozy Comfort" },
        { src: room2, caption: "Modern Elegance" },
        { src: room3, caption: "Spacious Luxury" },
        { src: room4, caption: "Chic Retreat" },
    ];
  return (
    <Container>
      <Title>Our Rooms</Title>
      <Gallery images={rooms} />
    </Container>
  );
};

export default Rooms;
