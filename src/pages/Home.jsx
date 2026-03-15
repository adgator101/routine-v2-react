import React from "react";
import { getTodayDay } from "@/lib/utils";
import DateButton from "@/components/DateButton";
import RoutineCard from "@/components/RoutineCard";
import EventCard from "@/components/EventCard";
import MiniCalendar from "@/components/MiniCalendar";
import ClassDetailModal from "@/components/ClassDetailModal";
import { useRoutines } from "@/hooks/useRoutines";
import { useEffect } from "react";
import { CalendarDays } from "lucide-react";

const markedDates = [
  new Date(2026, 2, 15),
  new Date(2026, 2, 20),
  new Date(2026, 3, 2),
];

const Home = () => {
  const { routineData } = useRoutines();
  const [modalVisibile, setModalVisibile] = React.useState(false);
  const [selectedRoutine, setselectedRoutine] = React.useState(null);

  const [todayRoutine, setTodayRoutine] = React.useState([]);
  const [selectedDay, setSelectedDay] = React.useState();

  const handleSelect = (day) => {
    setSelectedDay(day);
    setTodayRoutine(handleFilterRoutine(day));
  };

  const handleFilterRoutine = (day) => {
    if (!routineData.week) return [];
    const filteredRoutine = routineData.week.filter(
      (routine) => routine.day?.toLowerCase() === day?.toLowerCase(),
    );
    return filteredRoutine.flatMap((routine) => routine.slots || []);
  };

  const handleRoutineClick = (routine) => {
    setselectedRoutine(routine);
    setModalVisibile(true);
  };

  useEffect(() => {
    if (!routineData) return;
    const dayName = getTodayDay();
    handleSelect(dayName);
    setTodayRoutine(handleFilterRoutine(dayName));
  }, [routineData]);

  return (
    <>
      {/* Modal overlay */}
      {modalVisibile && selectedRoutine && (
        <ClassDetailModal
          data={selectedRoutine}
          onModalClose={() => setModalVisibile(false)}
        />
      )}

      {/* Page wrapper */}
      <div className="px-4 pb-24 md:pb-6 lg:mx-auto lg:max-w-8xl">

        {/* ── Upcoming Events ───────────────────────────── */}
        <section className="mt-2">
          <h2 className="mb-1 font-poppins text-xl font-bold text-gray-900 dark:text-gray-100">
            Upcoming Events
          </h2>
          <EventCard />
        </section>

        {/* ── Main two-column layout ─────────────────────── */}
        <div className="mt-4 lg:flex lg:items-start lg:gap-6">

          {/* ── Left column: day picker + routine list ─── */}
          <div className="flex-1 min-w-0">
            <DateButton selectedDay={selectedDay} handleSelect={handleSelect} />

            <div className="mt-3">
              {todayRoutine.length > 0 ? (
                <div className="space-y-2">
                  {todayRoutine.map((routine, index) => (
                    <RoutineCard
                      key={index}
                      data={routine}
                      onRoutineClick={handleRoutineClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-10 text-center shadow-sm dark:border-gray-700 dark:bg-dark-card">
                  <CalendarDays size={40} className="mb-3 text-[#F84178]/40" />
                  <p className="font-poppins font-semibold text-gray-500 dark:text-gray-400">
                    No classes scheduled
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    Enjoy your free day!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── Right column: calendar + assignments ─── */}
          <div className="mt-4 lg:mt-0 lg:w-80 xl:w-96">

            {/* Calendar card */}
            <div className="rounded-2xl bg-white px-5 py-5 shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:bg-dark-card">
              <MiniCalendar markedDates={markedDates} />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

