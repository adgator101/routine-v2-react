import React from "react";
import RoutineData from "../../class-routine.json";
import { getTodayDay } from "@/lib/utils";
import Onboarding from "@/components/Onboarding";
import DateButton from "@/components/DateButton";
import RoutineCard from "@/components/RoutineCard";
import EventCard from "@/components/EventCard";
import Assignment from "@/components/Assignment";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const markedDates = [
  new Date(2025, 1, 23),
  new Date(2025, 2, 15),
  new Date(2025, 2, 20),
];
const Home = () => {
  const [todayRoutine, setTodayRoutine] = React.useState([]);
  const [selectedDay, setSelectedDay] = React.useState();
  const [userGroup, setUserGroup] = React.useState("");
  const handleUserGroup = (group) => {
    localStorage.setItem("user", group);
    setUserGroup(group);
  };
  const user = localStorage.getItem("user");
  React.useEffect(() => {
    const dayName = getTodayDay();
    handleSelect(dayName);
    const groupNumber = localStorage.getItem("user");
    setUserGroup(groupNumber);
    setTodayRoutine(handleFilterRoutine(dayName, groupNumber));
  }, [userGroup]);

  const handleSelect = (date) => {
    setSelectedDay(date);
    setTodayRoutine(handleFilterRoutine(date, userGroup));
  };

  const handleFilterRoutine = (day, group) => {
    return RoutineData.filter(
      (data) => data.Day === day && data.Group.includes(group),
    );
  };
  return (
    <div className="flex flex-wrap px-4 pb-20 md:pb-4 lg:flex-col lg:gap-6">
      <div className="event-card w-full">
        <EventCard />
      </div>
      <div className="grid gap-20 lg:grid-cols-[2fr_1fr] lg:gap-10">
        <div>
          <DateButton selectedDay={selectedDay} handleSelect={handleSelect} />
          {todayRoutine.length > 0 ? (
            todayRoutine.map((routine, index) => (
              <RoutineCard key={index} data={routine} />
            ))
          ) : (
            <div>No classes found for the selected day.</div>
          )}
          {!user && <Onboarding setUserGroup={handleUserGroup} />}
        </div>
        <div className="space-y-10 lg:justify-self-end">
          <div className="h-fit w-fit rounded-lg border px-6 py-4 dark:border-dark-border dark:bg-dark-card lg:w-full">
            <DayPicker
              mode="single"
              selected={null}
              modifiers={{ marked: markedDates }}
              modifiersStyles={{
                marked: {
                  backgroundColor: "#ffeb3b",
                  borderRadius: "50%",
                  color: "#000",
                },
              }}
            />
          </div>
          <div className="assignment-container h-fit w-full rounded-lg border px-6 py-6 dark:border-dark-border dark:bg-dark-card">
            <Assignment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
