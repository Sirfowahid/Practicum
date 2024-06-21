import React from "react";
import club1 from "../assets/home/club1.jpg";
import club2 from "../assets/home/club2.jpg";
import club3 from "../assets/home/club3.jpg";
import gym1 from "../assets/home/gym1.jpg";
import gym2 from "../assets/home/gym2.jpg";
import gym3 from "../assets/home/gym3.jpg";
import food1 from "../assets/home/food1.jpg";
import food2 from "../assets/home/food2.jpg";
import food3 from "../assets/home/food3.jpg";
import ImgLTextR from "../components/ui/ImgLTextR";
import ImgRTextL from "../components/ui/ImgRTextL";

const Services = () => {
  return (
    <>
      <div className="mt-4">
        <ImgLTextR
          imageUrl={club1}
          title="Exciting Club Activities"
          description="Join our vibrant club scene with events that cater to all interests. From dance nights to themed parties, there's always something happening."
        />
        <ImgRTextL
          imageUrl={club2}
          title="Community and Socializing"
          description="Meet new people and make lasting friendships. Our club activities are designed to bring people together and create unforgettable memories."
        />
        <ImgLTextR
          imageUrl={club3}
          title="Exclusive Member Benefits"
          description="As a club member, enjoy exclusive benefits such as priority event access, special discounts, and more."
        />

        <ImgRTextL
          imageUrl={gym1}
          title="State-of-the-Art Gym"
          description="Our gym is equipped with the latest machines and free weights to help you reach your fitness goals. Whether you're a beginner or a pro, we've got you covered."
        />
        <ImgLTextR
          imageUrl={gym2}
          title="Personal Training"
          description="Get personalized workout plans and one-on-one training sessions with our certified personal trainers. Achieve your fitness goals faster with expert guidance."
        />
        <ImgRTextL
          imageUrl={gym3}
          title="Group Fitness Classes"
          description="Join our group fitness classes and work out in a fun, motivating environment. From yoga to HIIT, there's something for everyone."
        />

        <ImgLTextR
          imageUrl={food1}
          title="Delicious Cuisine"
          description="Indulge in a variety of delicious dishes prepared by our top chefs. Our menu features a range of cuisines to satisfy every palate."
        />
        <ImgRTextL
          imageUrl={food2}
          title="Healthy Options"
          description="Enjoy healthy and nutritious meals that are both tasty and good for you. Our menu includes vegetarian, vegan, and gluten-free options."
        />
        <ImgLTextR
          imageUrl={food3}
          title="Relaxing Ambiance"
          description="Dine in a relaxing and comfortable setting. Our restaurant provides the perfect atmosphere for a casual meal or a special occasion."
        />
      </div>
    </>
  );
};

export default Services;
