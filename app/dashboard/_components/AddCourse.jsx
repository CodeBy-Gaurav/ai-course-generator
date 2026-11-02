"use client";
import React, { useContext } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { HiOutlineSparkles, HiOutlinePlusCircle } from "react-icons/hi2";

function AddCourse() {
  const { user } = useUser();
  const router = useRouter();
  const { userCourseList } = useContext(UserCourseListContext);

  const totalCredits = 5;
  const courseCount = userCourseList?.length || 0;
  const remainingCredits = Math.max(0, totalCredits - courseCount);

  const handleAddCourse = () => {
    if (courseCount >= totalCredits) {
      router.push("/dashboard/upgrade");
    } else {
      router.push("/create-course");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 sm:p-8 bg-gradient-to-r from-cyan-500/10 via-sky-500/5 to-emerald-500/10 dark:from-zinc-900/90 dark:via-slate-900/80 dark:to-zinc-900/90 border border-cyan-500/20 dark:border-white/[0.08] rounded-3xl shadow-xs transition-colors beam-border-top">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 bg-white dark:bg-zinc-900 px-3 py-1 rounded-full border border-cyan-500/30 shadow-2xs">
            Personal Learning Studio
          </span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 px-3 py-1 rounded-full border border-slate-200/60 dark:border-slate-800">
            {remainingCredits} of {totalCredits} Credits Available
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
          Welcome back, <span className="text-cyan-600 dark:text-cyan-400">{user?.firstName || user?.fullName || "Learner"}</span> 👋
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
          Design custom multi-chapter video masterclasses tailored to any topic. Includes structured lesson notes, runnable code examples, and curated tutorials.
        </p>
      </div>

      <Button
        onClick={handleAddCourse}
        className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-2xl shrink-0 shadow-md flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
      >
        {courseCount >= totalCredits ? (
          <>
            <HiOutlineSparkles className="text-lg" />
            <span>Upgrade for Unlimited (₹499)</span>
          </>
        ) : (
          <>
            <HiOutlinePlusCircle className="text-xl" />
            <span>+ Create New Course</span>
          </>
        )}
      </Button>
    </div>
  );
}

export default AddCourse;
