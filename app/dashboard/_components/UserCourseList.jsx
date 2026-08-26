"use client";
import React, { useContext, useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import CourseCard from "./CourseCard";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  HiOutlineAcademicCap,
  HiOutlineMagnifyingGlass,
  HiOutlinePlusCircle,
} from "react-icons/hi2";
import { Input } from "@/components/ui/input";

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const { user } = useUser();
  const { setUserCourseList } = useContext(UserCourseListContext);

  useEffect(() => {
    if (user) {
      getUserCourses();
    }
  }, [user]);

  const getUserCourses = async () => {
    try {
      setLoading(true);
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      if (!userEmail) return;

      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.createdBy, userEmail));

      setCourseList(result || []);
      if (setUserCourseList) {
        setUserCourseList(result || []);
      }
    } catch (e) {
      console.error("Error fetching user courses:", e);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courseList.filter((course) => {
    const name = (course?.name || course?.courseOutput?.course?.name || "").toLowerCase();
    const category = (course?.category || "").toLowerCase();
    const query = searchQuery.toLowerCase().trim();

    const matchesSearch = query === "" || name.includes(query) || category.includes(query);
    const matchesCategory = filterCategory === "All" || category.includes(filterCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Programming", "Health", "Creative"];

  return (
    <div className="mt-10 space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-extrabold text-2xl text-slate-900 dark:text-white flex items-center gap-2">
            <span>My AI Courses</span>
            <span className="text-xs font-bold bg-primary/10 dark:bg-purple-950/60 text-primary dark:text-purple-300 px-2.5 py-0.5 rounded-full">
              {courseList?.length || 0}
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Continue learning or create a new curriculum on any topic.
          </p>
        </div>

        {courseList?.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-60">
              <HiOutlineMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
              <Input
                placeholder="Search my courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-transparent dark:border-slate-800">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    filterCategory === cat
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="w-full h-[320px] bg-slate-100 dark:bg-slate-900 animate-shimmer rounded-3xl border border-slate-200 dark:border-slate-800"
            />
          ))
        ) : filteredCourses?.length > 0 ? (
          filteredCourses.map((course, index) => (
            <CourseCard
              key={course.id || index}
              course={course}
              refreshData={getUserCourses}
            />
          ))
        ) : courseList?.length > 0 ? (
          <div className="col-span-full py-16 text-center border border-dashed rounded-3xl p-8 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 space-y-3">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No courses matching your search
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setFilterCategory("All");
              }}
              className="rounded-xl text-xs dark:border-slate-700"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-purple-200 dark:border-purple-900/40 rounded-3xl p-8 bg-gradient-to-b from-purple-50/40 to-white dark:from-purple-950/20 dark:to-slate-950 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-primary/10 dark:bg-purple-950/60 text-primary dark:text-purple-300 text-3xl flex items-center justify-center mx-auto shadow-xs">
              <HiOutlineAcademicCap />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                You haven&apos;t created any courses yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Generate your first comprehensive AI course complete with chapters and video tutorials in seconds.
              </p>
            </div>
            <Link href="/create-course" className="inline-block pt-2">
              <Button className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl px-6 shadow-md flex items-center gap-2">
                <HiOutlinePlusCircle className="text-lg" />
                <span>Create Your First Course</span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCourseList;
