import { MapPin } from "lucide-react";
import React from "react";

const EventCard = ({ title, daysLeft, location, image }) => {
  return (
    <>
      <p className="font-poppins text-2xl font-semibold">Upcoming Events</p>
      <div className="my-5 grid grid-cols-1 gap-3 font-manrope sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="grid cursor-pointer gap-3 rounded-lg border border-gray-200 p-3 py-4 shadow-md transition-[shadow_transform] hover:scale-105 hover:shadow-md"
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
                  <span className="text-md font-semibold text-[#db2778]">
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
