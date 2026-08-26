import React from "react";
import {
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineBookOpen,
  HiOutlinePlayCircle,
} from "react-icons/hi2";
import { normalizeCourse } from "@/lib/courseUtils";

function CourseDetail({ course }) {
  const courseData = normalizeCourse(course);

  const stats = [
    {
      label: "Skill Level",
      value: courseData?.level || "Beginner",
      icon: <HiOutlineChartBar />,
      bg: "bg-purple-50 dark:bg-purple-950/60",
      text: "text-purple-600 dark:text-purple-300",
    },
    {
      label: "Estimated Duration",
      value: courseData?.duration || "1-2 Hours",
      icon: <HiOutlineClock />,
      bg: "bg-blue-50 dark:bg-blue-950/60",
      text: "text-blue-600 dark:text-blue-300",
    },
    {
      label: "Total Curriculum",
      value: `${courseData?.noOfChapters || 0} Lessons`,
      icon: <HiOutlineBookOpen />,
      bg: "bg-pink-50 dark:bg-pink-950/60",
      text: "text-pink-600 dark:text-pink-300",
    },
    {
      label: "Video Integration",
      value: course?.includeVideo || "Yes (Curated)",
      icon: <HiOutlinePlayCircle />,
      bg: "bg-emerald-50 dark:bg-emerald-950/60",
      text: "text-emerald-600 dark:text-emerald-300",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
        >
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${stat.bg} ${stat.text}`}
          >
            {stat.icon}
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {stat.label}
            </p>
            <p className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white capitalize mt-0.5">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseDetail;
