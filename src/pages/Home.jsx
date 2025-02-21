import React from "react";
import RoutineData from "../../class-routine.json";
import { getTodayDay } from "@/lib/utils";
import Onboarding from "@/components/Onboarding";
import DateButton from "@/components/DateButton";
import RoutineCard from "@/components/RoutineCard";
import EventCard from "@/components/EventCard";
import Assignment from "@/components/Assignment";

const Home = () => {
  const [todayRoutine, setTodayRoutine] = React.useState([]);
  const [selectedDay, setSelectedDay] = React.useState("");
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
    <div className="flex pb-16 md:pb-0 lg:flex-col lg:gap-6">
      <div className="event-card">
        <EventCard />
      </div>
      <div className="grid gap-20 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
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
        <div className="space-y-10">
          <div className="h-48 w-full rounded-lg border-2">Calendar</div>
          <Assignment />
        </div>
      </div>
    </div>
  );
};

export default Home;
