"use client";
import React, { useEffect, useState, use } from "react";
import { db } from "@/configs/db";
import { CourseList, Chapters } from "@/configs/schema";
import { eq } from "drizzle-orm";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import CertificateModal from "./_components/CertificateModal";
import Header from "@/app/dashboard/_components/Header";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineCheckBadge } from "react-icons/hi2";
import { normalizeCourse } from "@/lib/courseUtils";
import { useUser } from "@clerk/nextjs";

function CourseStartPage({ params }) {
  const resolvedParams = use(params);
  const { user } = useUser();
  const [course, setCourse] = useState();
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [chaptersMap, setChaptersMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showCertificate, setShowCertificate] = useState(false);

  const courseId = resolvedParams?.courseId;

  useEffect(() => {
    if (courseId) {
      loadCourseAndAllChapters();
      loadProgress();
    }
  }, [courseId]);

  const loadProgress = () => {
    try {
      const saved = localStorage.getItem(`lgn_progress_${courseId}`);
      if (saved) {
        setCompletedLessons(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load progress from localStorage:", e);
    }
  };

  const toggleComplete = (idx) => {
    setCompletedLessons((prev) => {
      let updated;
      if (prev.includes(idx)) {
        updated = prev.filter((i) => i !== idx);
      } else {
        updated = [...prev, idx];
      }
      try {
        localStorage.setItem(`lgn_progress_${courseId}`, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save progress to localStorage:", e);
      }
      return updated;
    });
  };

  const loadCourseAndAllChapters = async () => {
    try {
      setLoading(true);

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

  const totalLessonsCount = chapters.length || 1;
  const progressPercent = Math.min(
    100,
    Math.round((completedLessons.length / totalLessonsCount) * 100)
  );
  const isCurrentCompleted = completedLessons.includes(selectedChapterIndex);

  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-200">
      <Header />
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-65px)]">
        {/* Chapter Sidebar */}
        <div className="w-full md:w-88 border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 space-y-4 shrink-0 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">
            <HiOutlineArrowLeft />
            <Link href={`/course/${course?.courseId}`}>&larr; Course Syllabus Overview</Link>
          </div>

          <div className="pt-1">
            <h2 className="font-extrabold text-lg text-slate-900 dark:text-white line-clamp-2">
              {courseData?.name || course?.name}
            </h2>
            <div className="flex items-center justify-between mt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>{completedLessons.length} of {chapters.length} Completed</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                {progressPercent}%
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progressPercent}%`,
                }}
              />
            </div>

            {/* Certificate Pill if completed */}
            {progressPercent === 100 && (
              <button
                onClick={() => setShowCertificate(true)}
                className="w-full mt-3 p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <HiOutlineCheckBadge className="text-base" />
                <span>Claim Certificate of Mastery</span>
              </button>
            )}
          </div>

          <div className="space-y-2 pt-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-1">
            {chapters.map((chapter, index) => (
              <div
                key={index}
                onClick={() => setSelectedChapterIndex(index)}
              >
                <ChapterListCard
                  chapter={chapter}
                  index={index}
                  isSelected={selectedChapterIndex === index}
                  isCompleted={completedLessons.includes(index)}
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
              isCompleted={isCurrentCompleted}
              onToggleComplete={() => toggleComplete(selectedChapterIndex)}
              onOpenCertificate={() => setShowCertificate(true)}
            />
          ) : (
            <div className="p-16 text-center text-slate-500 dark:text-slate-400">
              Select a chapter from the sidebar to begin learning.
            </div>
          )}
        </div>
      </div>

      {/* Certificate of Completion Modal */}
      <CertificateModal
        open={showCertificate}
        onClose={() => setShowCertificate(false)}
        courseTitle={courseData?.name || course?.name}
        courseCategory={courseData?.category || course?.category}
        userName={user?.fullName || user?.firstName || "Masterclass Scholar"}
      />
    </div>
  );
}

export default CourseStartPage;
