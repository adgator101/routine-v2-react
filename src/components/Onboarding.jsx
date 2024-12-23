import React, { useState } from "react";
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
  const groupNames = ["L4CG1", "L4CG2", "L4CG3", "L4CG4"];
  const handleNext = () => {
    setUserGroup(selectedGroup);
  };
  return (
    <>
      {onBoardingVisible && (
        <div className="flex-center absolute inset-0 z-50 h-full flex-col items-center justify-center bg-black bg-opacity-65 p-6">
          <div className="w-full max-w-md space-y-12 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-center text-2xl font-semibold">
              Welcome to BIC Routine
            </h2>
            <p className="text-center text-gray-600">
              Please select an option to continue:
            </p>
            <div className="flex-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex-between w-48 rounded-md border-2 px-4 py-2 text-gray-600 shadow-md">
                  {selectedGroup || "Select Group"}
                  <ChevronDown color="#9ca3af" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {groupNames.map((group) => (
                    <DropdownMenuItem
                      key={group}
                      onClick={() => setSelectedGroup(group)}
                      className="flex cursor-pointer justify-center px-4 py-2 text-gray-600"
                    >
                      {group}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex-center">
              <button
                disabled={!selectedGroup}
                onClick={() => {
                  handleNext();
                  setonBoardingVisible(false);
                }}
                className="hover:bg-blue-700 w-full rounded-md bg-accent px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:bg-pink-700 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Onboarding;
