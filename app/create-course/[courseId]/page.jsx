"use client";
import React, { useEffect, useState, use } from "react";
import { db } from "@/configs/db";
import { CourseList, Chapters } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import LoadingDialogue from "../_components/LoadingDialogue";
import { GenerateChapterContent } from "@/configs/AiModel";
import { getVideos } from "@/configs/service";
import { useRouter } from "next/navigation";
import { HiOutlineSparkles, HiOutlineArrowLeft } from "react-icons/hi2";
import { normalizeCourse } from "@/lib/courseUtils";
import Header from "@/app/dashboard/_components/Header";
import Link from "next/link";

function CourseLayoutPage({ params }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (resolvedParams?.courseId) {
      getCourse();
    }
  }, [resolvedParams]);

  const getCourse = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, resolvedParams.courseId));

      if (result && result.length > 0) {
        setCourse(result[0]);
      }
    } catch (err) {
      console.error("Error fetching course:", err);
      setErrorMessage("Could not load course details. Please refresh the page.");
    }
  };

  const generateChapterContent = async () => {
    if (!course) return;
    setLoading(true);
    setErrorMessage("");
    setStatusMessage("Generating in-depth lessons & fetching video tutorials in parallel...");

    const courseData = normalizeCourse(course);
    const chapters = courseData?.chapters || [];
    const courseName = courseData?.name || course?.name;

    try {
      const chapterPromises = chapters.map(async (chapter, index) => {
        let content = null;
        try {
          const aiResponse = await GenerateChapterContent(
            courseName,
            chapter?.name
          );
          content = aiResponse?.content || aiResponse;
        } catch (e) {
          console.error(`Error generating content for chapter ${index}:`, e);
          content = [
            {
              title: chapter?.name,
              description: chapter?.about || "Detailed lesson guide.",
            },
          ];
        }

        let videoId = "";
        try {
          const videos = await getVideos(`${courseName}: ${chapter?.name}`);
          videoId = videos[0]?.id?.videoId || "";
        } catch (e) {
          console.error(`Error fetching video for chapter ${index}:`, e);
        }

        try {
          await db
            .delete(Chapters)
            .where(
              and(
                eq(Chapters.courseId, course.courseId),
                eq(Chapters.chapterId, String(index))
              )
            );
        } catch (ignore) {}

        await db.insert(Chapters).values({
          courseId: course.courseId,
          chapterId: String(index),
          content: content,
          videoId: videoId,
        });

        return { index, success: true };
      });

      await Promise.all(chapterPromises);

      setStatusMessage("Finalizing your complete course and opening course player...");
      await db
        .update(CourseList)
        .set({ publish: true })
        .where(eq(CourseList.courseId, course.courseId));

      router.push(`/course/${course.courseId}/start`);
    } catch (err) {
      console.error("Failed to generate course content:", err);
      setErrorMessage("Something went wrong while generating chapters. Please try again.");
    } finally {
      setLoading(false);
      setStatusMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Header />

      <main className="mt-8 px-6 md:px-20 lg:px-44 pb-20">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-purple-400 transition-colors bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-2xs"
          >
            <HiOutlineArrowLeft />
            Back to Dashboard
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white">
              Course Layout
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Review and customize the outline before generating in-depth lessons and videos.
            </p>
          </div>
          <Button
            onClick={generateChapterContent}
            disabled={loading || !course}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2 font-semibold cursor-pointer"
          >
            <HiOutlineSparkles className="text-lg" />
            {loading ? "Generating Content..." : "Generate Full Course"}
          </Button>
        </div>

        {errorMessage && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl text-red-700 dark:text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        <LoadingDialogue loading={loading} status={statusMessage} />

        {course ? (
          <>
            <CourseBasicInfo course={course} refreshData={getCourse} />
            <CourseDetail course={course} />
            <ChapterList course={course} refreshData={getCourse} />

            <div className="mt-10 flex justify-end">
              <Button
                onClick={generateChapterContent}
                disabled={loading || !course}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl px-8 shadow-md"
              >
                Generate Full Course
              </Button>
            </div>
          </>
        ) : (
          <div className="py-20 text-center text-slate-400 animate-pulse">
            Loading course outline...
          </div>
        )}
      </main>
    </div>
  );
}

export default CourseLayoutPage;
