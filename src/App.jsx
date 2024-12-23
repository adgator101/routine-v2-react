import React, { useEffect } from "react";
import TodoCard from "./components/TodoCard";
import TodoSection from "./components/TodoSection";
import EventCard from "./components/EventCard";
import NavBar from "./components/NavBar";
import DateButton from "./components/DateButton";
import RoutineCard from "./components/RoutineCard";
import { useState } from "react";
import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage";

const App = () => {
  // let scheduleData = {};
  // const events = [
  //   {
  //     title: "Cyber Security 101",
  //     daysLeft: 16,
  //     location: "Biratnagar International College",
  //     image: "cyber-security-icon.png",
  //   },
  //   {
  //     title: "Christmas Carnival",
  //     daysLeft: 24,
  //     location: "Biratnagar International College",
  //     image: "christmas-carnival-icon.png",
  //   },
  //   {
  //     title: "Futurama",
  //     daysLeft: 54,
  //     location: "Biratnagar International College",
  //     image: "futurama-icon.png",
  //   },
  // ];


  // const [updateRoutine, setUpdateRoutine] = useState("SUN");
  // const [routineItems, setroutineItems] = useState([]);
  // async function fetchData(day) {
  //   const response = await fetch("class-routine.json");
  //   const rawData = await response.json();
  //   let classesForDay = rawData
  //     .filter((classData) => classData.Day == day)
  //     .map((classData) => {
  //       for (let key in classData) {
  //         if (Number.isNaN(classData[key])) {
  //           delete classData[key];
  //         }
  //       }
  //       return classData;
  //     });
  //   scheduleData[day] = classesForDay;
  //   setroutineItems(classesForDay);
  // }
  // useEffect(() => {
  //   fetchData(updateRoutine);
  // }, [updateRoutine]);
  // console.log(routineItems);
  return (
    <>
      {/* <NavBar />
      <DateButton onClick={setUpdateRoutine} />
      {routineItems.map((item, index) => (
        <RoutineCard data={item} key={index} />
      ))} */}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/routines" element={<Routines />} />
        <Route path="/routines/:id" element={<RoutineDetail />} />
        <Route path="/create" element={<CreateRoutine />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default App;
