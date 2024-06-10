import React from "react";
import hotel from "../assets/home/hotel3.jpg";
import Hero from "../components/ui/Hero";
const Home = () => {
  return (
    <>
      <Hero
        title="Welcome to Ascillia"
        subtitle="Experience luxury and comfort in the heart of the city. Your perfect getaway awaits."
        image={hotel}
      />
    </>
  );
};

export default Home;
