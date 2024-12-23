import React from "react";

const RoutineCard = ({ data }) => {
  return (
    <div>
      <div className="card card-hover flex-between mx-3 my-5 min-h-[80px] px-5 py-3 sm:mx-auto sm:w-2/3 md:h-auto">
        <div className="flex-center gap-5">
          <div className="teacher-pfp flex-shrink-0">
            <img
              className="w-10 cursor-pointer rounded-full transition-transform hover:scale-110 md:w-16"
              src="https://wallpapers.com/images/high/confused-patrick-random-pfp-x63wp9vs43cem64s.webp"
              alt="pfp"
            />
          </div>
          <div className="class-details">
            <div className="title text-sm font-bold md:text-lg">
              {data["Module Title"]}
            </div>
            <div className="time-room flex items-center gap-2 text-xs text-[#93939a] md:text-sm">
              <div className="time">{data.Time}</div>
              <div className="separator h-1 w-1 rounded-full bg-[#93939a]"></div>
              <div className="room">{data.Room}</div>
            </div>
          </div>
        </div>
        <button className="flex-center m-1 h-7 w-7 rounded-full bg-white p-3 text-xs font-bold text-red-500 shadow-xl md:p-4 md:text-base">
          {data["Class Type"].slice(0, 1)}
        </button>
      </div>
    </div>
  );
};

export default RoutineCard;
