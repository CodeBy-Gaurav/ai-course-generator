import React from "react";
import {
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineBookOpen,
  HiOutlinePlayCircle,
  HiOutlineCheckCircle,
  HiOutlineUserGroup,
  HiOutlineAcademicCap,
} from "react-icons/hi2";
import { normalizeCourse } from "@/lib/courseUtils";

function CourseDetail({ course }) {
  const courseData = normalizeCourse(course);

  const stats = [
    {
      label: "Skill Level",
      value: courseData?.level || "Beginner",
      icon: <HiOutlineChartBar />,
      bg: "bg-cyan-50 dark:bg-cyan-950/60",
      text: "text-cyan-600 dark:text-cyan-300",
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
      bg: "bg-indigo-50 dark:bg-indigo-950/60",
      text: "text-indigo-600 dark:text-indigo-300",
    },
    {
      label: "Video Integration",
      value: course?.includeVideo || "Yes (Curated)",
      icon: <HiOutlinePlayCircle />,
      bg: "bg-emerald-50 dark:bg-emerald-950/60",
      text: "text-emerald-600 dark:text-emerald-300",
    },
  ];

  const objectives = courseData?.learningObjectives || [];

  return (
    <div className="space-y-6 mt-6">
      {/* 4 Metric Badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Learning Objectives & Course Audience Split Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: What You'll Learn */}
        <div className="md:col-span-7 p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <HiOutlineCheckCircle className="text-emerald-500 text-xl" />
            <span>What You Will Master in This Course</span>
          </h3>

          <ul className="space-y-2.5">
            {objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
                <span className="leading-relaxed">{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Target Audience & Prerequisites */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              <HiOutlineUserGroup className="text-base" />
              <span>Target Audience</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {courseData?.targetAudience}
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <HiOutlineAcademicCap className="text-base" />
              <span>Prerequisites</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {courseData?.prerequisites}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
