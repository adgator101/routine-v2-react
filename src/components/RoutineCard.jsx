import React from "react";
import { BookOpen, Clock, MapPin } from "lucide-react";

const RoutineCard = ({ data, onRoutineClick }) => {
  console.log(data);

  return (
    <div className="flex w-full font-manrope" onClick={()=>onRoutineClick(data)}>
      <div className="group relative my-3 flex min-h-[80px] w-full cursor-pointer items-center justify-between rounded-lg border border-t bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 sm:my-4 sm:min-h-[90px] sm:px-5">
        <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-accent/80" />

        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent/5 to-blue/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex flex-1 items-start gap-3 sm:gap-4 md:gap-6">
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
            <div className="flex flex-1 flex-col gap-2.5">
              <h3 className="justify-between text-sm font-bold text-dark transition-colors dark:text-gray-100 sm:flex sm:text-base">
                <p className="group-hover:text-accent">
                  {data["Module Title"]}
                </p>
                <div className="flex items-center gap-1 transition-transform duration-300 hover:scale-105 sm:gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" />
                  <span className="text-sm text-gray-500">{data.Time}</span>
                </div>
              </h3>
              <div className="mb-1.5 mt-1 flex gap-2">
                <div className="flex items-center justify-self-start rounded-full bg-card-2/50 px-4 py-1 text-xs font-medium text-dark shadow-sm transition-all duration-300 group-hover:bg-card-2 sm:justify-self-end">
                  {data["Class Type"]}
                </div>
                <div className="flex items-center justify-self-start rounded-full bg-card-2/50 px-4 py-1 text-xs font-medium text-dark shadow-sm transition-all duration-300 group-hover:bg-card-2 sm:justify-self-end">
                  {data["Module Code"]}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-dark/70 dark:text-gray-400 sm:gap-4 sm:text-sm">
                <div className="flex items-center gap-1 transition-transform duration-300 hover:scale-105 sm:gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-blue sm:h-4 sm:w-4" />
                  <span className="text-sm">{data.Room}</span>
                </div>
                <div className="flex items-center gap-1 transition-transform duration-300 hover:scale-105 sm:gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" />
                  <span className="text-sm">{data.Lecturer}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineCard;
