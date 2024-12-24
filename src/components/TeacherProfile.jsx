import { CircleX } from "lucide-react";
import React from "react";
const TeacherProfile = () => {
  return (
    <div className="teacher-modal-container flex-center h-full w-full border-2 bg-black bg-opacity-20 ">
      <div className="teacher-profile-container flex flex-col items-center gap-5 rounded-xl p-5 text-center bg-white dark:bg-gray-800">
        <button className="self-end">
          <CircleX fill="transparent" color="red" />
        </button>
        <div className="teacher-image-left">
          <img
            className="h-32 w-32 rounded-full"
            src="https://wallpapers.com/images/high/confused-patrick-random-pfp-x63wp9vs43cem64s.webp"
            alt="pfp"
          />
        </div>
        <div className="teacher-details-right flex flex-col gap-5">
          <h1 className="text-xl font-bold dark:text-gray-100">Mr. Arvind Nepal</h1>
          <p className="text-sm text-[#A8A6AC] dark:text-gray-400">
            Internet Software Architecture and Database
          </p>
          <button className="btn-primary w-full justify-center !bg-accent">
            Mail
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
