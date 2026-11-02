import React from "react";
import { HiOutlineClock, HiOutlineBookOpen } from "react-icons/hi2";
import EditChapters from "./EditChapters";
import { normalizeCourse } from "@/lib/courseUtils";

function ChapterList({ course, refreshData, edit = true }) {
  const courseData = normalizeCourse(course);
  const chapters = courseData?.chapters || [];

  return (
    <div className="mt-10 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-2">
            <HiOutlineBookOpen className="text-cyan-600 dark:text-cyan-400 text-2xl" />
            <span>Course Curriculum &amp; Chapters</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Modular lessons with structured explanations and matched video tutorials.
          </p>
        </div>
        <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 dark:bg-cyan-950/60 border border-cyan-500/20 px-3.5 py-1.5 rounded-full">
          {chapters.length} Total Lessons
        </span>
      </div>

      <div className="space-y-4">
        {chapters.length > 0 ? (
          chapters.map((chapter, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:shadow-md hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-200 flex items-start justify-between gap-4 group"
            >
              <div className="flex gap-4 sm:gap-5 items-start">
                <div className="bg-gradient-to-br from-cyan-600 to-blue-700 flex-none h-12 w-12 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-sm shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                  {index + 1}
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {chapter?.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                    {chapter?.about}
                  </p>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold pt-1">
                    <HiOutlineClock className="text-cyan-600 dark:text-cyan-400 text-sm" />
                    <span>{chapter?.duration || "20 Minutes"}</span>
                  </div>
                </div>
              </div>

              {edit && (
                <div className="shrink-0">
                  <EditChapters
                    course={course}
                    index={index}
                    refreshData={refreshData}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl">
            No chapters available in this course outline.
          </div>
        )}
      </div>
    </div>
  );
}

export default ChapterList;
