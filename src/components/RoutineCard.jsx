import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

const RoutineCard = ({ data }) => {
  return (
    <div className="font-manrope flex justify-center cursor-pointer w-full">
      <div 
        className="group relative mx-2 sm:mx-3 my-3 sm:my-4 flex min-h-[80px] sm:min-h-[90px] w-full max-w-[95%] lg:max-w-4xl items-center justify-between rounded-lg bg-white dark:bg-gray-800 p-3 sm:p-5 shadow-sm border border-t transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700"
      >
        <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-accent/80" />

        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent/5 to-blue/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex flex-1 items-center gap-2 sm:gap-4 md:gap-6">
          <div className="relative flex-shrink-0 after:absolute after:inset-0 after:rounded-full after:shadow-sm after:transition-shadow after:duration-300 group-hover:after:shadow-md">
            <img
              className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
              src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-routine-psychology-flaticons-lineal-color-flat-icons-2.png"
              alt={`${data["Module Title"]} instructor`}
              loading="lazy"
            />
            <div className="absolute -bottom-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-white bg-card-3 shadow-sm" />
          </div>

          <div className="flex flex-1 flex-col gap-1 sm:gap-1.5">
            <h3 className="text-sm sm:text-base font-medium text-dark dark:text-gray-100 transition-colors group-hover:text-accent">
              {data["Module Title"]}
            </h3>
            
            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-dark/70 dark:text-gray-400">
              <div className="flex items-center gap-1 sm:gap-1.5 transition-transform duration-300 hover:scale-105">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
                <span>{data.Time}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 transition-transform duration-300 hover:scale-105">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue" />
                <span>{data.Room}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex h-8 sm:h-9 items-center rounded-full bg-card-2/50 px-3 sm:px-4 text-xs sm:text-sm font-medium text-dark shadow-sm transition-all duration-300 group-hover:bg-card-2">
            {data["Class Type"]}
          </div>
          
          <button 
            className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gray-50 text-dark/70 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-card-1/30 hover:text-accent hover:shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent/50"
            aria-label="Add to calendar"
          >
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoutineCard;