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
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 sm:p-8 bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-pink-500/10 dark:from-purple-950/40 dark:via-slate-900 dark:to-indigo-950/40 border border-purple-100 dark:border-purple-900/40 rounded-3xl shadow-xs transition-colors">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-purple-300 bg-white dark:bg-slate-900 px-3 py-1 rounded-full border border-purple-200/60 dark:border-purple-800/60 shadow-2xs">
            Welcome Back
          </span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 px-3 py-1 rounded-full border border-slate-200/60 dark:border-slate-800">
            {remainingCredits} Credits Available
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
          Hello, <span className="text-primary dark:text-purple-400">{user?.fullName || "Learner"}</span> 👋
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
          Create customized, multi-chapter video masterclasses with AI. Each course includes full notes, code examples, and top YouTube tutorials.
        </p>
      </div>

      <Button
        onClick={handleAddCourse}
        className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-2xl shrink-0 shadow-md flex items-center gap-2 transition-all hover:scale-105"
      >
        {courseCount >= totalCredits ? (
          <>
            <HiOutlineSparkles className="text-lg" />
            <span>Upgrade to Create (₹499)</span>
          </>
        ) : (
          <>
            <HiOutlinePlusCircle className="text-xl" />
            <span>+ Create AI Course</span>
          </>
        )}
      </Button>
    </div>
  );
}

export default AddCourse;