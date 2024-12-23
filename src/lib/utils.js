import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getTodayDay = () => {
  const date = new Date()
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI"];
  const dayName = daysOfWeek[date.getDay()]
  return dayName;
}