import React, { useState, useEffect } from "react";
import {
  AlarmClock,
  ClipboardList,
  Github,
  Linkedin,
  Mail,
  NotebookPen,
  XOctagonIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ClassDetailModal = ({ data, onModalClose }) => {
  const dataItems = [
    {
      "module code": {
        code: "5BU018",
        icon: "🏷️",
      },
      "class type": {
        class: "Lecture",
        icon: "📚",
      },
      group: {
        group: "L5HM1",
        icon: "👥",
      },
      room: {
        room: "TR - 02 Tamor",
        icon: "🏢",
      },
    },
  ];

  const teacherProfile = [
    {
      pfp: "arvind-nepal.jfif",
      name: "Mr. Arvind Nepal",
      description:
        "Teaches Introduction to Object Oriented Programming and Internet Software Architecture and Database.",
      socials: {
        linkedIn: "",
        gitHub: "",
      },
    },
    {
      pfp: "basanta-singh.jfif",
      name: "Mr. Basanta Singh",
      description:
        "Teaches Computational Mathematics, Introductory Programming and Problem Solving, and The Digital Business.",
      socials: {
        linkedIn: "",
        gitHub: "",
      },
    },
    {
      pfp: "sanjeev-rai.jfif",
      name: "Mr. Sanjeev Chamling",
      description:
        "Teaches Interactive 3D Applications and Academic Skills and Fundamentals of Computing.",
      socials: {
        linkedIn: "",
        gitHub: "",
      },
    },
    {
      pfp: "",
      name: "Mr. Sandip Tiwari",
      description:
        "Teaches Computational Mathematics, Interactive 3D Applications and Academic Skills, Fundamentals of Computing, and Introduction to Object Oriented Programming.",
      socials: {
        linkedIn: "",
        gitHub: "",
      },
    },
    {
      pfp: "",
      name: "Ms. Rakshya Adhikari",
      description:
        "Teaches The Innovative Business and Customer Acquisition & Retention.",
      socials: {
        linkedIn: "",
        gitHub: "",
      },
    },
    {
      pfp: "",
      name: "Mr Bikash Sharma",
      description: "Teaches The Digital Business.",
      socials: {
        linkedIn: "",
        gitHub: "",
      },
    },
    {
      pfp: "",
      name: "Mr Dipesh Neupane",
      description: "Teaches Researching Leisure.",
      socials: {
        linkedIn: "",
        gitHub: "",
      },
    },
    {
      pfp: "",
      name: "Ms.Sami Thapa",
      description: "Teaches Researching Leisure.",
      socials: {
        linkedIn: "",
        gitHub: "",
      },
    },
  ];

  const teacherData = teacherProfile.find(
    (teacher) => teacher.name === data["Lecturer"],
  );

  console.log(data);

  const [rotateFront, setrotateFront] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setrotateFront((prev) => !prev);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <div className="flex items-center justify-center p-3 py-6 font-poppins">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative min-w-[550px] max-w-[620px] cursor-default space-y-10 rounded-2xl bg-white p-10 shadow-lg"
        >
          {/* <div className="relative min-w-[550px] max-w-[620px] cursor-default space-y-10 rounded-2xl bg-white p-10 shadow-lg"> */}
          <div className="header flex flex-col items-center gap-5">
            <button
              className="absolute right-3 top-3 self-end rounded-full bg-red-500"
              onClick={() => onModalClose()}
            >
              <XOctagonIcon className="text-white" />
            </button>
            <h1 className="mt-3 text-2xl font-bold">{data["Module Title"]}</h1>
            <p className="text-lg font-medium text-gray-500">
              {data["Class Type"]} Session
            </p>
            <div className="group flex gap-3 rounded-xl bg-[#fdf2f8] px-6 py-4 shadow-md transition-[shadow_transform] hover:shadow-lg">
              <AlarmClock
                className={`group-hover:${rotateFront ? "-rotate-12" : "rotate-12"} text-red-500 transition-transform`}
              />
              <p>{data["Time"]}</p>
            </div>
          </div>
          <div className="class-details space-y-7">
            <div className="flex items-center gap-3">
              <ClipboardList />
              <h1 className="text-xl font-semibold">Class Details</h1>
            </div>
            <div className="grid grid-cols-2 gap-7">
              <DataCard
                icon={data["Module Code"].icon}
                title="Module Code"
                value={data["Module Code"]}
              />
              <DataCard
                icon={data["Class Type"].icon}
                title="Class Type"
                value={data["Class Type"]}
              />
              <DataCard
                icon={data["Group"].icon}
                title="Group"
                value={data["Group"]}
              />
              <DataCard
                icon={data["Room"].icon}
                title="Room"
                value={data["Room"]}
              />
            </div>
          </div>
          <div className="lecturer-detail space-y-7">
            <div className="flex items-center gap-3">
              <NotebookPen />
              <h1 className="text-xl font-semibold">Lecturer Information</h1>
            </div>
            <div className="justify-items-center space-y-7">
              <img
              src={teacherData && teacherData.pfp ? teacherData.pfp : "https://wallpapers.com/images/high/confused-patrick-random-pfp-x63wp9vs43cem64s.webp"}
                className={`relative h-28 w-28 rounded-full border-b-4 border-r-4 border-[#F84178] shadow-md before:h-28 before:w-28  before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:animate-pulse before:rounded-full before:transition-shadow before:hover:shadow-[0_0_36px_#F84178]`}
              />
              <p className="text-2xl font-semibold">{data["Lecturer"]}</p>
              <p className="font-medium text-gray-500">
                {teacherData
                  ? teacherData.description
                  : "No description available for this lecturer."}
              </p>
              <div className="socials flex items-center justify-center gap-7">
                <a
                  target="_blank"
                  href=""
                  className="cursor-pointer rounded-full bg-red-600 p-2 shadow-[0_4px_8px_#dc2626] transition-[shadow_transform] hover:rotate-12 hover:scale-105 hover:shadow-[0_4px_16px_#dc2626] active:scale-95"
                >
                  <Mail className="text-white" />
                </a>
                <a
                  target="_blank"
                  href=""
                  className="cursor-pointer rounded-full bg-sky-600 p-2 shadow-[0_4px_8px_#0284c7] transition-[shadow_transform] hover:rotate-12 hover:scale-105 hover:shadow-[0_4px_16px_#0284c7] active:scale-95"
                >
                  <Linkedin className="text-white" />
                </a>
                <a
                  target="_blank"
                  href=""
                  className="cursor-pointer rounded-full bg-black p-2 shadow-[0_4px_8px_#000] transition-[shadow_transform] hover:rotate-12 hover:scale-105 hover:shadow-[0_4px_16px_#000] active:scale-95"
                >
                  <Github className="text-white" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* </div> */}
    </AnimatePresence>
  );
};

export default ClassDetailModal;
const DataCard = ({ icon, title, value }) => {
  return (
    <div className="relative rounded-lg border-l-4 border-[#F84178] px-4 py-2 shadow-md transition-[shadow_transform] hover:-translate-y-0.5 hover:shadow-lg">
      <div>
        <h2 className="font-medium text-gray-500">{title}</h2>
        <p className="font-medium">{value}</p>
      </div>
      <div className="absolute bottom-3 right-3 rounded-full bg-[#Fdf2f8] p-1">
        {icon}
      </div>
    </div>
  );
};
