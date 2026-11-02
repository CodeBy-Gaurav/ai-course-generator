"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import CourseCard from "../dashboard/_components/CourseCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiOutlineSparkles, HiOutlineArrowRight } from "react-icons/hi2";

const FALLBACK_COURSES = [
  {
    id: 1001,
    courseId: "demo-nextjs-fullstack",
    name: "Production Next.js 16 & Server Actions",
    category: "Programming & Tech",
    level: "Intermediate",
    userName: "Alex Rivera",
    userProfileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    courseBanner: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&auto=format&fit=crop&q=80",
    courseOutput: {
      course: {
        name: "Production Next.js 16 & Server Actions",
        description: "Master React 19 Server Components, Turbopack, and high-performance server actions with database integration.",
        noOfChapters: 4,
        chapters: [{ name: "App Router Fundamentals" }, { name: "Server Actions" }, { name: "Streaming Data" }, { name: "Deployment" }]
      }
    }
  },
  {
    id: 1002,
    courseId: "demo-ai-deep-learning",
    name: "Applied Machine Learning with PyTorch",
    category: "AI & Data Science",
    level: "Advanced",
    userName: "Dr. Priya Nair",
    userProfileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
    courseBanner: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80",
    courseOutput: {
      course: {
        name: "Applied Machine Learning with PyTorch",
        description: "Build deep neural networks, transformer attention mechanisms, and fine-tune models from scratch.",
        noOfChapters: 5,
        chapters: [{ name: "Tensors & Vector Math" }, { name: "Convolutional Networks" }, { name: "Transformers" }, { name: "Fine-Tuning" }]
      }
    }
  },
  {
    id: 1003,
    courseId: "demo-financial-engineering",
    name: "Quantitative Finance & Algorithmic Trading",
    category: "Business & Finance",
    level: "Intermediate",
    userName: "Marcus Chen",
    userProfileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    courseBanner: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1000&auto=format&fit=crop&q=80",
    courseOutput: {
      course: {
        name: "Quantitative Finance & Algorithmic Trading",
        description: "Calculate risk-adjusted Sharpe ratios, backtest statistical arbitrage models, and automate trading execution.",
        noOfChapters: 4,
        chapters: [{ name: "Order Book Dynamics" }, { name: "Statistical Arbitrage" }, { name: "Backtesting" }, { name: "Risk Management" }]
      }
    }
  }
];

function LiveCourseShowcase() {
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    loadFeaturedCourses();
  }, []);

  const loadFeaturedCourses = async () => {
    try {
      const result = await db.select().from(CourseList).limit(3);
      if (result && result.length > 0) {
        setFeaturedCourses(result);
      }
    } catch (e) {
      console.error("Error loading featured courses:", e);
    }
  };

  const displayCourses = featuredCourses.length > 0 ? featuredCourses : FALLBACK_COURSES;

  return (
    <section className="py-24 bg-background text-foreground border-t border-slate-200/80 dark:border-white/[0.08] transition-colors relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 text-xs font-bold uppercase tracking-wider">
              <HiOutlineSparkles />
              Community Library
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Featured Community Masterclasses
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl">
              Explore real examples of interactive courses and masterclasses crafted on the platform.
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayCourses.map((course, index) => (
            <CourseCard
              key={course.id || index}
              course={course}
              displayUser={true}
              refreshData={loadFeaturedCourses}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LiveCourseShowcase;
