import { Star } from "lucide-react";
import React from "react";

const Assignment = () => {
  return (
    <>
      <p className="font-poppins text-xl font-semibold">Upcoming Assignments</p>
      {[...Array(2)].map((_, index) => (
        <div
          key={index}
          className="my-5 cursor-pointer rounded-lg px-3 py-4 font-manrope transition-[shadow_transform] hover:-translate-y-1 dark:border-dark-border group shadow-[0_2px_8px_rgba(0,_0,_0,_0.1)] hover:shadow-[0_4px_16px_rgba(0,_0,_0,_0.1)]"
        >
          <div className="flex gap-3">
            <Star className="text-yellow-500 group-hover:animate-spin" />
            <div className="space-y-1">
              <p className="font-semibold">Coursework</p>
              <p className="text-sm">4CS020/ML1: Interactive 3D Application</p>
              <p className="text-sm">
                <span className="font-semibold">100 points &nbsp;</span>
                <span>May 19, </span>
                <span>14:00</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Assignment;
