"use client";
import React from "react";
import Image from "next/image";
import {
  HiOutlineBookOpen,
  HiOutlinePlay,
} from "react-icons/hi2";
import DropdownOption from "./DropdownOption";
import { db } from "@/configs/db";
import { CourseList, Chapters } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { normalizeCourse } from "@/lib/courseUtils";
import { resolveBannerUrl } from "@/lib/bannerGenerator";

function CourseCard({ course, refreshData, displayUser = false }) {
  const courseData = normalizeCourse(course);
  const bannerUrl = resolveBannerUrl(course);

  const handleOnDelete = async () => {
    try {
      await db
        .delete(Chapters)
        .where(eq(Chapters.courseId, course?.courseId));

      await db
        .delete(CourseList)
        .where(eq(CourseList.id, course?.id));

      if (refreshData) refreshData();
    } catch (e) {
      console.error("Error deleting course:", e);
    }
  };

  const chapterCount = courseData?.noOfChapters || 0;

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-primary/40 dark:hover:border-purple-500/40 rounded-3xl shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Banner with floating badges */}
        <Link href={`/course/${course?.courseId}`} className="block relative overflow-hidden">
          <div className="relative w-full h-[190px] bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <Image
              src={bannerUrl}
              alt={courseData?.name || "Course Banner"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Top Badge Overlay */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20">
                {courseData?.category || course?.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 backdrop-blur-md shadow-xs">
                {courseData?.level || "Beginner"}
              </span>
            </div>

            {/* Play Hover Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                <HiOutlinePlay className="text-xl ml-0.5" />
              </div>
            </div>
          </div>
        </Link>

        {/* Content Area */}
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/course/${course?.courseId}`} className="flex-1">
              <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 group-hover:text-primary dark:group-hover:text-purple-400 transition-colors leading-snug">
                {courseData?.name || course?.name}
              </h3>
            </Link>
            {!displayUser && (
              <DropdownOption handleOnDelete={handleOnDelete} />
            )}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {courseData?.description || "Explore in-depth modules and interactive video lessons."}
          </p>

          {/* Stat Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="flex items-center gap-1.5 font-bold text-primary dark:text-purple-300 bg-primary/10 dark:bg-purple-950/60 px-2.5 py-1 rounded-lg">
              <HiOutlineBookOpen className="text-sm" />
              {chapterCount} Lessons
            </span>

            <Link
              href={`/course/${course?.courseId}/start`}
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-purple-400 transition-colors flex items-center gap-1"
            >
              <span>Learn Now</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Creator Info footer for Explore Mode */}
      {displayUser && (
        <div className="flex items-center gap-2.5 px-5 py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
          {course?.userProfileImage ? (
            <Image
              src={course.userProfileImage}
              alt={course?.userName || "User"}
              width={26}
              height={26}
              className="rounded-full ring-1 ring-slate-200 dark:ring-slate-700"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
              {(course?.userName || "U")[0]}
            </div>
          )}
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 line-clamp-1">
            {course?.userName || "Creator"}
          </span>
        </div>
      )}
    </div>
  );
}

export default CourseCard;
