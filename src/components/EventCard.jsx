import { MapPin } from "lucide-react";
import React from "react";
import Carousel from "./react-bits/Carousel";

const EventCard = ({ title, daysLeft, location, image }) => {
  const events = [
    {
      title: "BIC Experience",
      daysLeft: "0D",
      location: "Biratnagar International College",
      image: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
    },
    {
      title: "Cyber Security 101",
      daysLeft: "10D",
      location: "Biratnagar International College",
      image: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
    },
    {
      title: "Cyber Security 101",
      daysLeft: "10D",
      location: "Biratnagar International College",
      image: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
    }
  ]

  return (
    <>
      <div className="my-5 flex flex-wrap gap-3 font-manrope md:gap-6">
        <div
          style={{ height: "150px", position: "relative" }}
          className="justify-items-center sm:hidden"
        >
          <Carousel
            baseWidth={350}
            autoplay={true}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
        </div>
        {events.map((index) => (
          <div
            key={index}
            className="hidden cursor-pointer gap-3 rounded-xl p-4 shadow-[0_2px_8px_rgba(0,_0,_0,_0.1)] hover:shadow-[0_4px_16px_rgba(0,_0,_0,_0.1)] transition-[shadow_transform] hover:scale-105 dark:border-dark-border dark:bg-dark-card sm:grid w-72"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
              <img
                src={index.image}
                alt="pic"
                className="h-16 w-16 rounded-full"
              />
                <p className="text-lg font-semibold">{index.title}</p>
              </div>
              <div className="flex justify-between gap-5">
                <p className="text-sm font-semibold">
                  <span className="text-2xl font-poppins font-semibold text-[#db2778]">
                    {index.daysLeft}
                  </span>
                  left
                </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={32} />
              <p className="">{index.location}</p>
            </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EventCard;
