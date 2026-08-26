"use client";
import React, { useEffect, useState, use } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import CourseBasicInfo from "@/app/create-course/[courseId]/_components/CourseBasicInfo";
import CourseDetail from "@/app/create-course/[courseId]/_components/CourseDetail";
import ChapterList from "@/app/create-course/[courseId]/_components/ChapterList";
import Header from "@/app/dashboard/_components/Header";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";

function PublicCoursePage({ params }) {
  const resolvedParams = use(params);
  const [course, setCourse] = useState();

  useEffect(() => {
    if (resolvedParams?.courseId) {
      getCourse();
    }
  }, [resolvedParams]);

  const getCourse = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, resolvedParams.courseId));

      if (result && result.length > 0) {
        setCourse(result[0]);
      }
    } catch (e) {
      console.error("Error fetching course:", e);
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-200">
      <Header />
      <div className="px-6 md:px-20 lg:px-44 py-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-purple-400 transition-colors bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-2xs"
          >
            <HiOutlineArrowLeft />
            Back to Dashboard
          </Link>
        </div>

        {course ? (
          <>
            <CourseBasicInfo
              course={course}
              refreshData={getCourse}
              edit={false}
            />
            <CourseDetail course={course} />
            <ChapterList
              course={course}
              refreshData={getCourse}
              edit={false}
            />
          </>
        ) : (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400 animate-pulse">
            Loading course overview...
          </div>
        )}
      </div>
    </div>
  );
}

export default PublicCoursePage;
