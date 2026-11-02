"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineSparkles,
  HiOutlineXMark,
  HiOutlineBookOpen,
} from "react-icons/hi2";

const CATEGORIES = ["All", "Tech", "AI", "Business", "Design", "Health", "Science"];

function DashboardExplorePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const result = await db.select().from(CourseList).limit(50);
      setCourses(result || []);
    } catch (e) {
      console.error("Error fetching explore courses:", e);
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
    <div className="space-y-8">
      {/* Header Banner */}
      <div>
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs uppercase tracking-wider">
          <HiOutlineSparkles />
          <span>Discover Community Courses</span>
        </div>
        <h1 className="font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white mt-1">
          Explore Community Masterclasses
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Search and learn from community courses published across all categories.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="relative w-full">
          <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          <Input
            type="text"
            placeholder="Search by topic, skill, or keyword (e.g. Next.js, Python, Fitness)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 pr-10 h-12 rounded-xl text-sm bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-primary"
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

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1">
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

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HiOutlineBookOpen className="text-cyan-600 dark:text-cyan-400" />
          <span>Courses ({filteredCourses.length})</span>
        </h2>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div
              key={index}
              className="w-full h-[300px] bg-slate-100 dark:bg-slate-900 animate-shimmer rounded-3xl border border-slate-200 dark:border-slate-800"
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
              refreshData={fetchCourses}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-3">
          <p className="text-slate-600 dark:text-slate-300 font-semibold">
            No courses found matching &quot;{searchQuery}&quot;
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="rounded-xl dark:border-slate-700"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}

export default DashboardExplorePage;