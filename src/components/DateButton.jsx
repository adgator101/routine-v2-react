import React from "react";

const DateButton = ({ onClick }) => {
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
    <div className="date-buttons flex-center flex-wrap">
      {daysOfWeek.map((day, index) => (
        <button
          key={index}
          className="m-2 rounded-2xl border-2 border-[#eaecf0] bg-white px-4 py-2 font-bold shadow-md transition-transform hover:-translate-y-3"
          onClick={() => onClick(day)}
        >
          <div className="date text-xl">{datesOfWeek[index]}</div>
          <div className="day text-xs text-[#cdcdd0]">{day}</div>
        </button>
      ))}
    </div>
  );
};

export default DateButton;
