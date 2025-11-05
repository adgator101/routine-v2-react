import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Onboarding = ({ setUserGroup }) => {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [onBoardingVisible, setonBoardingVisible] = useState(true);
  const groupNames = ["L4CG1", "L4CG2", "L4CG3", "L4CG4","L4CG5", "L4BG1"];
  const handleNext = () => {
    setUserGroup(selectedGroup);
  };
  useEffect(() => {
    if (onBoardingVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [onBoardingVisible]);
  return (
    <>
      {onBoardingVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm">
          <div className="max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl transition-all sm:w-full">
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Welcome to BIC Routine
            </h2>
            <p className="mt-3 text-center text-gray-600">
              Please select your group to continue
            </p>

            <div className="mt-8 flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex w-64 items-center justify-between rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-700 shadow-sm hover:border-gray-400 focus:outline-none">
                  <span className="font-medium">
                    {selectedGroup || "Select Group"}
                  </span>
                  <ChevronDown size={18} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 rounded-md p-1">
                  {groupNames.map((group) => (
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
            </div>

            <div className="mt-10">
              <button
                disabled={!selectedGroup}
                onClick={() => {
                  handleNext();
                  setonBoardingVisible(false);
                }}
                className="w-full rounded-lg bg-accent px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Onboarding;
