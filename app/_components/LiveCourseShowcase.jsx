"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import CourseCard from "../dashboard/_components/CourseCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiOutlineSparkles, HiOutlineArrowRight } from "react-icons/hi2";

function LiveCourseShowcase() {
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    loadFeaturedCourses();
  }, []);

  const loadFeaturedCourses = async () => {
    try {
      const result = await db.select().from(CourseList).limit(3);
      setFeaturedCourses(result || []);
    } catch (e) {
      console.error("Error loading featured courses:", e);
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-850 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 dark:bg-purple-950/60 text-primary dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
              <HiOutlineSparkles />
              Sample AI Output
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Featured Community Masterclasses
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl">
              Explore real examples of interactive courses generated with AI Course Generator.
            </p>
          </div>

          <Link href="/explore">
            <Button
              variant="outline"
              className="rounded-xl flex items-center gap-2 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 font-semibold"
            >
              <span>View All Courses</span>
              <HiOutlineArrowRight />
            </Button>
          </Link>
        </div>

        {featuredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map((course, index) => (
              <CourseCard
                key={course.id || index}
                course={course}
                displayUser={true}
                refreshData={loadFeaturedCourses}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-slate-500 dark:text-slate-400">
            Generate your first course to see it featured here!
          </div>
        )}
      </div>
    </section>
  );
}

export default LiveCourseShowcase;
