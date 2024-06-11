import React from "react";
import hotel from "../assets/home/hotel3.jpg";
import gym from "../assets/home/gym1.jpg";
import food from "../assets/home/food1.jpg";
import club from "../assets/home/club1.jpg";
import Hero from "../components/ui/Hero";
import TeamMembers from "../components/ui/TeamMembers";
import ImgLTextR from "../components/ui/ImgLTextR";
import ImgRTextL from "../components/ui/ImgRTextL";
const Home = () => {
  
  return (
    <>
      <Hero
        title="Welcome to Ascillia"
        descripton="Experience luxury and comfort in the heart of the city. Your perfect getaway awaits."
        image={hotel}
      />
      
      <TeamMembers/>
      <ImgLTextR
        title="State-of-the-Art Gym"
        description="Stay fit and energized in our fully-equipped gym, featuring the latest exercise machines and personal training services. Our gym offers a variety of classes, from yoga to high-intensity interval training, led by expert trainers. After your workout, relax and rejuvenate with our luxurious spa facilities."
        imageUrl={gym}
      />
      <ImgRTextL
        title="Gourmet Dining"
        description="Indulge in a culinary journey with our gourmet dining options, offering exquisite dishes crafted by top chefs. Enjoy a diverse range of cuisines with fresh, locally-sourced ingredients and artfully presented dishes. Pair your meal with selections from our extensive wine list or enjoy a handcrafted cocktail from our bar."
        imageUrl={food}
      />
      <ImgLTextR
        title="Vibrant Night Club"
        description="Experience the nightlife at our vibrant night club, where music, dancing, and drinks create unforgettable evenings. Enjoy live DJ performances, an electrifying atmosphere, and a wide selection of cocktails and premium spirits. Perfect for celebrating special occasions or a fun night out."
        imageUrl={club}
      />
    </>
  );
};

export default Home;
