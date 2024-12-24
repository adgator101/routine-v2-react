import React from "react";
import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage";
import NotFound from "./components/NotFound";
import { Navigate } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
