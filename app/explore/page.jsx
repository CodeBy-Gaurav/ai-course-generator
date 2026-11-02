"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import Header from "@/app/_components/Header";
import CourseCard from "@/app/dashboard/_components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineSparkles,
  HiOutlineXMark,
  HiOutlineBookOpen,
} from "react-icons/hi2";

const CATEGORIES = ["All", "Tech", "AI", "Business", "Design", "Health", "Science"];

function PublicExplorePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchPublicCourses();
  }, []);

  const fetchPublicCourses = async () => {
    try {
      setLoading(true);
      const result = await db.select().from(CourseList).limit(40);
      setCourses(result || []);
    } catch (e) {
      console.error("Error loading explore courses:", e);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const name = (course?.name || course?.courseOutput?.course?.name || "").toLowerCase();
    const desc = (course?.courseOutput?.course?.description || "").toLowerCase();
    const category = (course?.category || "").toLowerCase();
    const query = searchQuery.toLowerCase().trim();

    const matchesSearch =
      query === "" ||
      name.includes(query) ||
      desc.includes(query) ||
      category.includes(query);

    const matchesCategory =
      selectedCategory === "All" ||
      category.includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === "Tech" && category.includes("program")) ||
      (selectedCategory === "AI" && (category.includes("ai") || category.includes("data"))) ||
      (selectedCategory === "Design" && (category.includes("design") || category.includes("creative")));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Title Banner */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 text-xs font-bold uppercase tracking-wider">
            <HiOutlineSparkles />
            Community Library
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Explore Community Masterclasses
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Discover comprehensive video courses and structured curriculums created by educators, developers, and learners worldwide.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative w-full">
              <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              <Input
                type="text"
                placeholder="Search courses by topic (e.g. Python, Next.js, Yoga, Financial Freedom)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-10 h-12 rounded-xl text-sm md:text-base bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <HiOutlineXMark className="text-lg" />
                </button>
              )}
            </div>

            {searchQuery && (
              <Button
                variant="ghost"
                onClick={() => setSearchQuery("")}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
              >
                Clear
              </Button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-2 hidden sm:inline">
              Category:
            </span>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "bg-primary text-white shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HiOutlineBookOpen className="text-cyan-600 dark:text-cyan-400" />
              <span>
                {selectedCategory === "All" ? "All Courses" : `${selectedCategory} Courses`}
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                {filteredCourses.length}
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div
                  key={index}
                  className="w-full h-[320px] bg-slate-100 dark:bg-slate-900 animate-shimmer rounded-3xl border border-slate-200 dark:border-slate-800"
                />
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <CourseCard
                  key={course.id || index}
                  course={course}
                  displayUser={true}
                  refreshData={fetchPublicCourses}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-4">
              <div className="w-16 h-16 bg-cyan-500/10 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20 text-3xl rounded-2xl flex items-center justify-center mx-auto">
                <HiOutlineMagnifyingGlass />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                No matching courses found
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                We couldn&apos;t find any courses matching &quot;{searchQuery}&quot;. Try searching for another topic or create your own!
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="rounded-xl dark:border-slate-700"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default PublicExplorePage;
