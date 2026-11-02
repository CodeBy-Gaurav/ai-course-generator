"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiOutlineArrowLeft, HiOutlineHome } from "react-icons/hi2";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center transition-colors">
      <div className="space-y-4 max-w-md">
        <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-purple-400 bg-primary/10 dark:bg-purple-950/60 px-3.5 py-1 rounded-full">
          404 Error
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          The course or page you are looking for does not exist or has been moved.
        </p>

        <div className="pt-4 flex items-center justify-center gap-3">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl px-6 flex items-center gap-2">
              <HiOutlineHome className="text-lg" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <Link href="/explore">
            <Button
              variant="outline"
              className="rounded-xl border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              <span>Explore Courses</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
