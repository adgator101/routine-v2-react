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
    <div className="date-buttons flex flex-wrap justify-center gap-4 p-4">
      {daysOfWeek.map((day, index) => (
        <button
          key={index}
          className={`group relative overflow-hidden rounded-xl px-6 py-4 font-bold shadow-lg transition-transform ${
            selectedDay === day ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" : "bg-white text-gray-700"
          } hover:scale-105 hover:shadow-xl`}
          onClick={() => handleSelect(day)}
        >
          <div
            className={`absolute inset-0 h-full w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-70 transition-transform duration-300 ${
              selectedDay === day ? 'scale-100' : 'scale-0 group-hover:scale-100'
            }`}
          ></div>
          <div className="relative z-10 text-2xl font-extrabold">{datesOfWeek[index]}</div>
          <div
            className={`relative z-10 text-sm font-medium ${
              selectedDay === day ? "text-white" : "text-gray-500"
            }`}
          >
            {day}
          </div>
        </button>
      ))}
    </div>
  );
};

export default DateButton;
