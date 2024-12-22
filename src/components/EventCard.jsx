import { MapPin } from "lucide-react";
import React from "react";
const EventCard = () => {
  return (
    <div className="flex w-4/12 flex-col gap-6 rounded-lg bg-gray-200 px-3 py-4 shadow-md">
      <div className="event-card-top flex items-center gap-10">
        <div className="event-card-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2299/2299172.png"
            alt=""
            width={100}
          />
        </div>
        <div className="event-type text-2xl">Cyber Security 101</div>
      </div>
      <div className="event-card-bottom flex items-center gap-10">
        <div className="event-card-countdown flex gap-1 text-[#505070]">
          <div className="event-card-countdown-time text-4xl font-extrabold">
            16D
          </div>
          <div className="event-card-countdown-extra-info self-end text-sm">
            left
          </div>
        </div>
        <div className="event-location flex items-center gap-1">
          <MapPin fill="gray" />
          <p>Biratnagar International College</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
