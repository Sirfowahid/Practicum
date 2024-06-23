import React from "react";
import hotel from "../../assets/home/hotel3.jpg";
import Hero from "../../components/ui/Hero";
import Rooms from "../../components/ui/Rooms";
import TeamMembers from "../../components/ui/TeamMembers";
import OtherServices from "../../components/ui/OtherServices";
import Social from "../../components/ui/Social";
const UserHome = () => {
  
  return (
    <>
      <Hero
        title="Welcome to Ascillia"
        descripton="Experience luxury and comfort in the heart of the city. Your perfect getaway awaits."
        image={hotel}
      />
      <Rooms/>
      <OtherServices/>
      <TeamMembers/>
      <Social/>
    </>
  );
};

export default UserHome;
