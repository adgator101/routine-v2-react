import { MapPin } from "lucide-react";
import React from "react";
const EventCard = ({ title, daysLeft, location, image }) => {
  return (
    <>
      <p className="font-manrope text-2xl font-semibold">Upcoming Events</p>
      <div className="my-5 grid gap-3 font-poppins sm:flex flex-wrap">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="grid gap-3 rounded-lg p-3 shadow-sm transition-shadow hover:shadow-md cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <img
                src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
                alt="pic"
                className="h-10 w-10 rounded-full"
              />
              <div className="grid">
                <p className="text-lg font-semibold">Cyber Security 101</p>
                <p>
                  <span className="font-semibold text-[#db2778]">16D </span>left
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
