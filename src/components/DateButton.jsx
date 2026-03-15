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
    <div className="my-4 grid grid-cols-6 gap-1.5 font-manrope lg:my-0">
      {daysOfWeek.map((day, index) => {
        const isSelected = selectedDay === day;
        const isToday = currentDayIndex === index;

        return (
          <button
            key={index}
            onClick={() => handleSelect(day)}
            className={`flex flex-col items-center rounded-xl px-2 py-3 transition-all duration-200 ${
              isSelected
                ? "bg-[#F84178] text-white shadow-[0_4px_14px_rgba(248,65,120,0.3)]"
                : "bg-white text-gray-600 shadow-[0_1px_4px_rgba(0,0,0,0.08)] hover:shadow-[0_3px_10px_rgba(0,0,0,0.1)] dark:bg-gray-900 dark:text-gray-300"
            }`}
          >
            <span
              className={`text-[10px] font-semibold uppercase tracking-widest ${
                isSelected ? "text-white/80" : isToday ? "text-[#F84178]" : "text-gray-400"
              }`}
            >
              {day}
            </span>
            <span
              className={`mt-1 text-base font-bold leading-none ${
                isSelected ? "text-white" : isToday ? "text-[#F84178]" : "text-gray-700 dark:text-gray-200"
              }`}
            >
              {datesOfWeek[index]}
            </span>
            {/* Today dot */}
            {isToday && !isSelected && (
              <span className="mt-1.5 h-1 w-1 rounded-full bg-[#F84178]" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default DateButton;
