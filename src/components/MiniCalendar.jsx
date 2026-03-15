import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * MiniCalendar
 * @param {Date[]} markedDates  - dates to show a dot underneath
 * @param {Date}   selected     - currently selected date
 * @param {func}   onSelect     - callback(date)
 */
const MiniCalendar = ({ markedDates = [], selected, onSelect }) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [];

  // Empty prefix cells
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isSameDay = (a, b) =>
    a instanceof Date &&
    b instanceof Date &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isToday = (d) =>
    d && isSameDay(new Date(viewYear, viewMonth, d), today);

  const isSelected = (d) =>
    d && selected instanceof Date &&
    isSameDay(new Date(viewYear, viewMonth, d), selected);

  const isMarked = (d) =>
    d &&
    markedDates.some((md) =>
      isSameDay(new Date(viewYear, viewMonth, d), md),
    );

  const handleClick = (d) => {
    if (!d || !onSelect) return;
    onSelect(new Date(viewYear, viewMonth, d));
  };

  return (
    <div className="w-full font-manrope select-none">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between px-1">
        <button
          onClick={prevMonth}
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-[#F84178]/10 hover:text-[#F84178] active:scale-90"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="font-poppins font-semibold text-gray-800">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-[#F84178]/10 hover:text-[#F84178] active:scale-90"
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day headers */}
      <div className="mb-1 grid grid-cols-7">
        {DAYS.map((day) => (
          <div
            key={day}
            className="flex items-center justify-center py-1 text-xs font-semibold uppercase tracking-wide text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((d, idx) => {
          const todayCell = isToday(d);
          const selectedCell = isSelected(d);
          const markedCell = isMarked(d);

          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-center"
            >
              {d ? (
                <button
                  onClick={() => handleClick(d)}
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-150
                    ${
                      selectedCell
                        ? "bg-[#F84178] text-white shadow-sm shadow-pink-300"
                        : todayCell
                          ? "border-2 border-[#F84178] text-[#F84178] font-bold"
                          : "text-gray-700 hover:bg-[#F84178]/10 hover:text-[#F84178]"
                    }
                  `}
                >
                  {d}
                  {/* Marked dot */}
                  {markedCell && !selectedCell && (
                    <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-amber-400" />
                  )}
                </button>
              ) : (
                <span className="h-8 w-8" />
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      {markedDates.length > 0 && (
        <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-3 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span>Event</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full border-2 border-[#F84178]" />
            <span>Today</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCalendar;
