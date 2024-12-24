import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

const RoutineCard = ({ data }) => {
  return (
    <div className="flex w-full cursor-pointer justify-center font-manrope">
      <div className="group relative mx-2 my-3 flex min-h-[80px] w-full max-w-[95%] items-center justify-between rounded-lg border border-t bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:mx-3 sm:my-4 sm:min-h-[90px] sm:p-5 lg:max-w-4xl">
        <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-accent/80" />

        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent/5 to-blue/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex flex-1 items-center gap-2 sm:gap-4 md:gap-6">
          <div className="relative flex-shrink-0 after:absolute after:inset-0 after:rounded-full after:shadow-sm after:transition-shadow after:duration-300 group-hover:after:shadow-md">
            <img
              className="h-10 w-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12 md:h-14 md:w-14"
              src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-routine-psychology-flaticons-lineal-color-flat-icons-2.png"
              alt={`${data["Module Title"]} instructor`}
              loading="lazy"
            />
            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-card-3 shadow-sm sm:h-4 sm:w-4" />
          </div>

          <div className="sm:flex-between grid w-full gap-2 sm:gap-0">
            <div className="order-2 flex flex-1 flex-col gap-1.5 sm:order-1">
              <h3 className="text-sm font-medium text-dark transition-colors group-hover:text-accent dark:text-gray-100 sm:text-base">
                {data["Module Title"]}
              </h3>

              <div className="flex flex-wrap gap-2 text-xs text-dark/70 dark:text-gray-400 sm:gap-4 sm:text-sm">
                <div className="flex items-center gap-1 transition-transform duration-300 hover:scale-105 sm:gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" />
                  <span>{data.Time}</span>
                </div>
                <div className="flex items-center gap-1 transition-transform duration-300 hover:scale-105 sm:gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-blue sm:h-4 sm:w-4" />
                  <span>{data.Room}</span>
                </div>
              </div>
            </div>
            <div className="order-1 flex h-7 items-center justify-self-start rounded-full bg-card-2/50 px-4 text-sm font-medium text-dark shadow-sm transition-all duration-300 group-hover:bg-card-2 sm:order-2 sm:mr-2 sm:h-9 sm:justify-self-end sm:text-base">
              {data["Class Type"]}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-dark/70 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-card-1/30 hover:text-accent hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent/50 active:scale-95 sm:h-10 sm:w-10"
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
