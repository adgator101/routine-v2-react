import { MapPin, CalendarDays, Clock } from "lucide-react";
import React from "react";

const FALLBACK_EVENTS = [
  {
    title: "BIC Experience Day",
    daysLeft: 0,
    location: "Biratnagar International College",
    thumbnailUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    date: "Mar 15, 2026",
  },
  {
    title: "Cyber Security 101",
    daysLeft: 10,
    location: "BIC — Lab Block",
    thumbnailUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
    date: "Mar 25, 2026",
  },
  {
    title: "AI & ML Workshop",
    daysLeft: 18,
    location: "Biratnagar International College",
    thumbnailUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    date: "Apr 2, 2026",
  },
];

const SingleEventCard = ({ title, daysLeft, location, thumbnailUrl, date }) => {
  const isToday = daysLeft === 0;
  const isSoon = daysLeft > 0 && daysLeft <= 3;

  const badgeClass = isToday
    ? "bg-[#F84178] text-white"
    : isSoon
      ? "bg-orange-100 text-orange-700"
      : "bg-[#DDD4FB] text-violet-700";

  const badgeLabel = isToday ? "Today" : `${daysLeft}d left`;

  return (
    <div className="group w-72 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(248,65,120,0.15)]">
      {/* Thumbnail */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Countdown badge */}
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${badgeClass}`}
        >
          {badgeLabel}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 font-poppins font-semibold text-gray-900 leading-tight line-clamp-2">
          {title}
        </h3>
        <div className="space-y-1.5 text-sm text-gray-500">
          {date && (
            <div className="flex items-center gap-2">
              <CalendarDays size={13} className="shrink-0 text-[#F84178]" />
              <span>{date}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MapPin size={13} className="shrink-0 text-[#F84178]" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ events }) => {
  const displayEvents = events?.length ? events : FALLBACK_EVENTS;

  return (
    <div className="my-5 font-manrope">
      <div className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {displayEvents.map((event, idx) => (
          <SingleEventCard key={idx} {...event} />
        ))}
      </div>
    </div>
  );
};

export default EventCard;

