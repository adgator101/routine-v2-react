import React from "react";
import DateButton from "./DateButton";
import RoutineCard from "./RoutineCard";
import RoutineData from "../../class-routine.json";
import { getTodayDay } from "@/lib/utils";
import Onboarding from "@/components/Onboarding";
const RoutineSection = () => {
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
    <>
      <DateButton selectedDay={selectedDay} handleSelect={handleSelect} />
      {todayRoutine.length > 0 ? (
        todayRoutine.map((routine, index) => (
          <RoutineCard key={index} data={routine} />
        ))
      ) : (
        <div>No classes found for the selected day.</div>
      )}
      {!user && <Onboarding setUserGroup={handleUserGroup} />}
    </>
  );
};

export default RoutineSection;
