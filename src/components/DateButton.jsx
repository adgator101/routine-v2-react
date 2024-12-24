import React from "react";

const DateButton = ({ handleSelect, selectedDay }) => {
  const currentDate = new Date();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI"];
  const currentDayIndex = currentDate.getDay();
  const datesOfWeek = Array.from({ length: 7 }, (_, index) => {
    const dayOffset = index - currentDayIndex;
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + dayOffset);
    return date.getDate();
  });

  return (
    <div className="date-buttons flex justify-center gap-4 lg:gap-6 p-4 mb-9">
      {daysOfWeek.map((day, index) => {
        const isSelected = selectedDay === day;

        return (
          <button
            key={index}
            onClick={() => handleSelect(day)}
            className={`flex w-16 flex-col items-center rounded-xl px-3 py-2 lg:py-3 text-xs transition-all duration-200 lg:px-9 ${
              isSelected
                ? "bg-blue-500 shadow-blue-500/30 scale-105 text-white shadow-lg"
                : "bg-white dark:bg-gray-900"
            } hover:scale-105 hover:shadow-lg ${!isSelected && "hover:bg-gray-50 dark:hover:bg-gray-800"} border border-gray-200`}
          >
            <span
              className={`mb-1 lg:text-2xl text-sm font-bold ${
                isSelected ? "text-black" : "text-gray-900"
              } `}
            >
              {datesOfWeek[index]}
            </span>
            <span
              className={`text-xs lg:text-sm font-medium ${
                isSelected ? "text-black" : "text-gray-500"
              } `}
            >
              {day}
            </span>
            {isSelected && (
              <div className="mt-2 h-1 w-4 rounded-full bg-purple-400"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default DateButton;
