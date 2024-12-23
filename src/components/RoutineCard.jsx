import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

const RoutineCard = ({ data }) => {
  return (
    <div className="font-manrope flex justify-center">
      <div 
        className="group  relative mx-3 my-4 flex min-h-[90px] w-full max-w-2xl items-center justify-between rounded-lg bg-white p-5 shadow-sm border border-t transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:px-6"
      >
        {/* Status Indicator */}
        <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-accent/80" />

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent/5 to-blue/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Left Section: Profile and Details */}
        <div className="relative flex flex-1 items-center gap-4 sm:gap-6">
          <div className="relative flex-shrink-0 after:absolute after:inset-0 after:rounded-full after:shadow-sm after:transition-shadow after:duration-300 group-hover:after:shadow-md">
            <img
              className="h-12 w-12 rounded-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14"
              src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-routine-psychology-flaticons-lineal-color-flat-icons-2.png"
              alt={`${data["Module Title"]} instructor`}
            />
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-card-3 shadow-sm" />
          </div>

          <div className="flex flex-1 flex-col gap-1.5">
            <h3 className="line-clamp-1 text-lg font-medium text-dark transition-colors group-hover:text-accent">
              {data["Module Title"]}
            </h3>
            
            <div className="flex flex-wrap gap-4 text-sm text-dark/70">
              <div className="flex items-center gap-1.5 transition-transform duration-300 hover:scale-105">
                <Clock className="h-4 w-4 text-accent" />
                <span>{data.Time}</span>
              </div>
              <div className="flex items-center gap-1.5 transition-transform duration-300 hover:scale-105">
                <MapPin className="h-4 w-4 text-blue" />
                <span>{data.Room}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 items-center rounded-full bg-card-2/50 px-4 text-sm font-medium text-dark shadow-sm transition-all duration-300 group-hover:bg-card-2">
            {data["Class Type"]}
          </div>
          
          <button 
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-dark/70 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-card-1/30 hover:text-accent hover:shadow-md active:scale-95"
            aria-label="Add to calendar"
          >
            <Calendar className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoutineCard;