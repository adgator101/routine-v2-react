import React, { useState, useEffect } from "react";
import { useUserGroup } from "@/context/UserGroupContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [Courses, setCourses] = useState({});
  const [groupList, setGroupList] = useState([]);
  const { setUserGroup } = useUserGroup();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // e.preventDefault();
    setUserGroup(selectedGroup);
    toast.success("Logged in successfully!");
    setTimeout(() => {
      navigate("/");
    }, 700);
  };

  const groupData = [
    {
      batch: "A23",
      BIHM: {
        groups: ["L5HM1"],
      },
      BIBM: {
        groups: ["L4BG1"],
      },
    },
    {
      batch: "A24",
      BCS: {
        groups: ["L4CG1", "L4CG2", "L4CG3", "L4CG4"],
      },
      BIBM: {
        groups: ["L4CG1"],
      },
    },
    // {
    //   batch: "A25",
    //   BCS: {
    //     groups: ["L4CG1", "L4CG2"],
    //   },
    //   BIBM: {
    //     groups: ["L4CG1", "L4CG2"],
    //   },
    // },
  ];

  useEffect(() => {
    const found = groupData.find((b) => b.batch === selectedBatch);
    setCourses(found || {});
    setSelectedCourse("");
    setSelectedGroup("");
    setGroupList([]);
  }, [selectedBatch]);

  useEffect(() => {
    if (selectedCourse && Courses[selectedCourse]) {
      setGroupList(Courses[selectedCourse].groups);
    } else {
      setGroupList([]);
    }
    setSelectedGroup("");
  }, [selectedCourse, Courses]);
  return (
    <div>
      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-[#F8F7FC] px-6 py-4">
        <div className="flex items-center gap-2">
          <img
            src="https://media.discordapp.net/attachments/1134751200651255879/1377511596443566131/image.png?ex=68393b25&is=6837e9a5&hm=8a6f532d6ed1fe48308e1aace5a49871537259c52c22fbe207c61d33d766d8c2&="
            alt="Logo"
            // className="h-36 w-36"
          />
        </div>
      </nav>
      <Card className="grid min-h-screen items-center gap-10 rounded-none bg-[#F8F7FC] p-3 pt-24 font-manrope lg:grid-cols-2 lg:p-20">
        <div className="hidden space-y-7 lg:block">
          <h1 className="flex flex-col gap-3 text-[2.5rem] font-bold leading-tight">
            <p>
              Sign Up and Say{" "}
              <span className="font-extrabold text-[#f84178]">Goodbye</span>
            </p>
            to Messy Schedules <div>Hello to Smart College Planning.</div>
          </h1>
          <p>
            If you don't have an account you can{" "}
            <span className="cursor-pointer font-bold text-[#f84178]">
              Register here!
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-10 lg:justify-self-center">
          <CardHeader className="p-0">
            <CardTitle className="text-3xl lg:text-4xl">Welcome User</CardTitle>
          </CardHeader>
          <CardContent className="p-0 text-left lg:w-96">
            <Label htmlFor="email" className="text-lg">
              Email
            </Label>
            <Input type="email" placeholder="e.g. np...@gmail.com" />
            <div className="p-3"></div>
            <Label htmlFor="password" className="text-lg">
              Password
            </Label>
            <Input type="password" placeholder="" />
          </CardContent>
          <div className="flex flex-wrap items-center gap-5 md:max-w-sm">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex w-44 items-center justify-between rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-700 shadow-sm hover:border-gray-400 focus:outline-none">
                <span className="font-medium">
                  {selectedBatch || "Select Batch"}
                </span>
                <ChevronDown size={18} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44 rounded-md p-1">
                {groupData.map((batch) => (
                  <DropdownMenuItem
                    key={batch.batch}
                    onClick={() => {
                      setSelectedBatch(batch.batch);
                      setSelectedCourse("");
                      setSelectedGroup("");
                    }}
                    className="cursor-pointer rounded-md px-4 py-2 text-gray-700 hover:bg-accent/10 hover:text-accent"
                  >
                    {batch.batch}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {selectedBatch && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex w-44 items-center justify-between rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-700 shadow-sm hover:border-gray-400 focus:outline-none">
                  <span className="font-medium">
                    {selectedCourse || "Select Course"}
                  </span>
                  <ChevronDown size={18} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44 rounded-md p-1">
                  {Object.keys(Courses)
                    .filter((k) => k !== "batch")
                    .map((Course) => (
                      <DropdownMenuItem
                        key={Course}
                        onClick={() => {
                          setSelectedCourse(Course);
                          setSelectedGroup("");
                        }}
                        className="cursor-pointer rounded-md px-4 py-2 text-gray-700 hover:bg-accent/10 hover:text-accent"
                      >
                        {Course}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {selectedCourse && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex w-44 items-center justify-between rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-700 shadow-sm hover:border-gray-400 focus:outline-none">
                  <span className="font-medium">
                    {selectedGroup || "Select Group"}
                  </span>
                  <ChevronDown size={18} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44 rounded-md p-1">
                  {groupList.map((group) => (
                    <DropdownMenuItem
                      key={group}
                      onClick={() => setSelectedGroup(group)}
                      className="cursor-pointer rounded-md px-4 py-2 text-gray-700 hover:bg-accent/10 hover:text-accent"
                    >
                      {group}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <div>
            <Button
              onClick={() => {
                // setIsLogin(true);
                handleSubmit();
              }}
              className="w-full rounded-full bg-[#f84178] px-10 py-5 shadow-[0_2px_5px_#f84178] transition hover:bg-[#f84178] active:scale-90"
            >
              Login
            </Button>
            <div className="my-5 flex w-full items-center justify-evenly text-gray-400">
              <div className="h-0.5 w-1/3 flex-shrink-0 bg-gray-300"></div>
              <p>OR</p>
              <div className="h-0.5 w-1/3 flex-shrink-0 bg-gray-300"></div>
            </div>
            <CardFooter>
              <a
                href=""
                className="flex w-full items-center justify-center gap-3 rounded-xl p-3 shadow-[0_1px_3px_gray] transition active:scale-90"
              >
                <img
                  className="h-5 w-5"
                  src="https://cdn.iconscout.com/icon/free/png-512/free-google-logo-icon-download-in-svg-png-gif-file-formats--youtube-pack-logos-icons-1721659.png?f=webp&w=256"
                  alt="google"
                />
                <p className="text-sm text-gray-500">Login with Google</p>
              </a>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
