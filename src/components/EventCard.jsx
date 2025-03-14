import { MapPin } from "lucide-react";
import React from "react";
import Carousel from "./react-bits/Carousel";

const EventCard = ({ title, daysLeft, location, image }) => {
  return (
    <>
      <p className="font-poppins text-2xl font-semibold">Upcoming Events</p>
      <div className="my-5 grid gap-3 font-manrope sm:grid-cols-2 md:grid-cols-3 md:gap-6">
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
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="hidden cursor-pointer gap-3 rounded-lg border p-4 shadow-sm transition-[shadow_transform] hover:scale-105 hover:shadow-md dark:border-dark-border dark:bg-dark-card sm:grid"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
                alt="pic"
                className="h-10 w-10 rounded-full"
              />
              <div className="flex flex-col gap-2">
                <p className="text-md font-bold">Cyber Security 101</p>
                <p className="text-sm">
                  <span className="text-md font-poppins font-bold text-[#db2778]">
                    16D{" "}
                  </span>
                  left
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin />
              <p>Biratnagar International College</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EventCard;
