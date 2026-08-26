"use client";
import React, { useEffect, useState, use } from "react";
import { db } from "@/configs/db";
import { CourseList, Chapters } from "@/configs/schema";
import { eq } from "drizzle-orm";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import Header from "@/app/dashboard/_components/Header";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { normalizeCourse } from "@/lib/courseUtils";

function CourseStartPage({ params }) {
  const resolvedParams = use(params);
  const [course, setCourse] = useState();
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [chaptersMap, setChaptersMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (resolvedParams?.courseId) {
      loadCourseAndAllChapters();
    }
  }, [resolvedParams]);

  const loadCourseAndAllChapters = async () => {
    try {
      setLoading(true);
      const courseId = resolvedParams.courseId;

      const [courseResults, chapterResults] = await Promise.all([
        db
          .select()
          .from(CourseList)
          .where(eq(CourseList.courseId, courseId)),
        db
          .select()
          .from(Chapters)
          .where(eq(Chapters.courseId, courseId)),
      ]);

      if (courseResults && courseResults.length > 0) {
        setCourse(courseResults[0]);
      }

      const map = {};
      (chapterResults || []).forEach((row) => {
        map[String(row.chapterId)] = row;
      });
      setChaptersMap(map);
    } catch (e) {
      console.error("Error loading course and chapters:", e);
    } finally {
      setLoading(false);
    }
  };

  const courseData = normalizeCourse(course);
  const chapters = courseData?.chapters || [];
  const activeChapter = chapters[selectedChapterIndex];
  const activeChapterContent = chaptersMap[String(selectedChapterIndex)];

  const hasNext = selectedChapterIndex < chapters.length - 1;
  const hasPrev = selectedChapterIndex > 0;

  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-200">
      <Header />
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-65px)]">
        {/* Chapter Sidebar */}
        <div className="w-full md:w-88 border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 space-y-4 shrink-0 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-purple-400 transition-colors">
            <HiOutlineArrowLeft />
            <Link href={`/course/${course?.courseId}`}>&larr; Course Syllabus Overview</Link>
          </div>

          <div className="pt-1">
            <h2 className="font-extrabold text-lg text-slate-900 dark:text-white line-clamp-2">
              {courseData?.name || course?.name}
            </h2>
            <div className="flex items-center justify-between mt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>{chapters.length} Total Lessons</span>
              <span className="text-primary dark:text-purple-400 font-bold">
                {Math.round(((selectedChapterIndex + 1) / (chapters.length || 1)) * 100)}% complete
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div
                className="bg-primary dark:bg-purple-500 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((selectedChapterIndex + 1) / (chapters.length || 1)) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="space-y-2 pt-3 max-h-[calc(100vh-230px)] overflow-y-auto pr-1">
            {chapters.map((chapter, index) => (
              <div
                key={index}
                onClick={() => setSelectedChapterIndex(index)}
              >
                <ChapterListCard
                  chapter={chapter}
                  index={index}
                  isSelected={selectedChapterIndex === index}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Chapter Content Main Area */}
        <div className="flex-1 bg-white dark:bg-slate-900 overflow-y-auto">
          {loading ? (
            <div className="p-16 text-center text-slate-400 animate-pulse space-y-3">
              <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded-xl w-2/3 mx-auto" />
              <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl w-full max-w-3xl mx-auto" />
              <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl w-full max-w-3xl mx-auto" />
            </div>
          ) : activeChapter ? (
            <ChapterContent
              chapter={activeChapter}
              content={activeChapterContent}
              onNextLesson={() =>
                setSelectedChapterIndex((prev) => Math.min(prev + 1, chapters.length - 1))
              }
              onPrevLesson={() =>
                setSelectedChapterIndex((prev) => Math.max(prev - 1, 0))
              }
              hasNext={hasNext}
              hasPrev={hasPrev}
              currentLessonIndex={selectedChapterIndex}
              totalLessons={chapters.length}
            />
          ) : (
            <div className="p-16 text-center text-slate-500 dark:text-slate-400">
              Select a chapter from the sidebar to begin learning.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseStartPage;
