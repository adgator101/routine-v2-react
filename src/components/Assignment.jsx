import { Star, Clock, BookMarked } from "lucide-react";

const MOCK_ASSIGNMENTS = [
  {
    type: "Coursework",
    module: "4CS020/ML1",
    title: "Interactive 3D Application",
    points: 100,
    due: "May 19",
    time: "14:00",
  },
  {
    type: "Lab Report",
    module: "4MM013/MM1",
    title: "Computational Mathematics — Week 8",
    points: 50,
    due: "May 22",
    time: "17:00",
  },
];

const Assignment = ({ assignments }) => {
  const items = assignments?.length ? assignments : MOCK_ASSIGNMENTS;

  return (
    <>
      <h2 className="font-poppins font-bold text-gray-900 dark:text-gray-100">
        Upcoming Assignments
      </h2>
      <div className="mt-3 space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="group cursor-pointer rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F84178]/20 hover:shadow-md dark:border-gray-700 dark:bg-dark-card"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100">
                <Star size={15} className="text-amber-500" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="rounded-full bg-[#F84178]/10 px-2.5 py-0.5 text-xs font-semibold text-[#F84178]">
                    {item.type}
                  </span>
                  <span className="text-xs text-gray-400">{item.module}</span>
                </div>
                <p className="mt-1.5 font-semibold text-gray-800 dark:text-gray-100 leading-tight group-hover:text-[#F84178] transition-colors">
                  {item.title}
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <BookMarked size={11} className="text-[#F84178]" />
                    {item.points} pts
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} className="text-blue" />
                    {item.due}, {item.time}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Assignment;

