"use client";
import { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  HiMiniSquares2X2,
  HiLightBulb,
  HiClipboardDocumentCheck,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { userInputContext } from "../_context/UserInputContext";
import { GenerateCourseLayout } from "@/configs/AiModel";
import LoadingDialogue from "./_components/LoadingDialogue";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getCourseBanner } from "@/lib/bannerGenerator";
import { eq } from "drizzle-orm";
import Header from "@/app/dashboard/_components/Header";

function CreateCourse() {
  const stepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 className="text-xl" />,
    },
    {
      id: 2,
      name: "Topic & Details",
      icon: <HiLightBulb className="text-xl" />,
    },
    {
      id: 3,
      name: "Preferences",
      icon: <HiClipboardDocumentCheck className="text-xl" />,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userCreditCount, setUserCreditCount] = useState(0);
  const { userCourseInput } = useContext(userInputContext);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      checkUserCredits();
    }
  }, [user]);

  const checkUserCredits = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;
      const courses = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.createdBy, email));
      setUserCreditCount(courses?.length || 0);
    } catch (e) {
      console.error("Error checking credits:", e);
    }
  };

  const checkStatus = () => {
    if (!userCourseInput) return true;
    if (
      activeIndex === 0 &&
      (!userCourseInput?.category || userCourseInput?.category?.trim().length === 0)
    ) {
      return true;
    }
    if (
      activeIndex === 1 &&
      (!userCourseInput?.topic || userCourseInput?.topic?.trim().length === 0)
    ) {
      return true;
    }
    return false;
  };

  const handleGenerateCourseLayout = async () => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) {
      setErrorMessage("Please sign in to create and save courses.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const existingCourses = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.createdBy, userEmail));

      if (existingCourses && existingCourses.length >= 5) {
        setErrorMessage(
          "⚠️ You have used all 5 free credits! Please upgrade to Pro for ₹499/month for unlimited AI course creation."
        );
        setLoading(false);
        setTimeout(() => {
          router.push("/dashboard/upgrade");
        }, 2000);
        return;
      }
    } catch (e) {
      console.error("Credit validation error:", e);
    }

    const category = userCourseInput?.category || "Programming";
    const topic = userCourseInput?.topic || "General";
    const level = userCourseInput?.difficulty || "Beginner";
    const duration = userCourseInput?.duration || "1 Hour";
    const video = userCourseInput?.video || "yes";
    const chapters = userCourseInput?.chapters || 4;

    const BASIC_PROMPT =
      "Generate a Course Tutorial on following Detail with field as Course Name, Description, Along with Chapter Name, about, Duration:";
    const USER_INPUT_PROMPT = `Category:${category}, Topic:${topic}, Level:${level}, Duration:${duration}, Video:${video}, Chapters:${chapters}, in JSON format`;
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;

    try {
      const response = await GenerateCourseLayout(
        userCourseInput,
        FINAL_PROMPT
      );

      const courseId = uuidv4();
      const userName = user?.fullName || "Course Creator";
      const userImage = user?.imageUrl || "";

      const bannerUrl = getCourseBanner(
        response?.course?.name || topic,
        category
      );

      await db.insert(CourseList).values({
        courseId: courseId,
        name:
          response?.course?.name ||
          userCourseInput?.topic ||
          "AI Generated Course",
        category: category,
        level: level,
        courseOutput: response,
        createdBy: userEmail,
        userName: userName,
        userProfileImage: userImage,
        courseBanner: bannerUrl,
        includeVideo: video === "no" ? "No" : "Yes",
      });

      router.push(`/create-course/${courseId}`);
    } catch (error) {
      console.error("Error generating course layout:", error);
      setErrorMessage(
        "Failed to generate course layout. Please check your network or try again."
      );
      setLoading(false);
    }
  };

  const remainingCredits = Math.max(0, 5 - userCreditCount);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Header />

      <main className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-center items-center mt-10 text-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-widest font-bold text-primary dark:text-purple-300 bg-primary/10 dark:bg-purple-950/60 px-3 py-1 rounded-full">
              AI Course Creator
            </span>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800">
              {remainingCredits} of 5 Credits Left
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl text-slate-900 dark:text-white font-extrabold">
            Create Your Course
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-md">
            Fill in a few details and let AI design a tailored curriculum with videos and lessons.
          </p>
        </div>

        {/* Stepper Indicator */}
        <div className="flex justify-center items-center mt-10">
          {stepperOptions.map((item, index) => (
            <div key={item.id} className="flex items-center">
              <div className="flex flex-col items-center w-[70px] md:w-[120px]">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeIndex >= index
                      ? "bg-primary text-white shadow-md scale-105"
                      : "bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-800"
                  }`}
                >
                  {item.icon}
                </div>
                <h2
                  className={`text-xs font-semibold mt-2 text-center ${
                    activeIndex >= index
                      ? "text-slate-900 dark:text-slate-100 font-bold"
                      : "text-slate-400 dark:text-slate-600"
                  }`}
                >
                  {item.name}
                </h2>
              </div>
              {index !== stepperOptions.length - 1 && (
                <div
                  className={`h-1 w-[40px] sm:w-[80px] md:w-[140px] rounded-full transition-colors duration-300 -mt-5 ${
                    activeIndex > index
                      ? "bg-primary"
                      : "bg-slate-200 dark:bg-slate-800"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="max-w-md mx-auto mt-6 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-2xl text-red-700 dark:text-red-400 text-sm text-center font-medium shadow-2xs">
            {errorMessage}
          </div>
        )}

        {/* Step Components */}
        <div className="px-2 md:px-12 lg:px-24 mt-8">
          {activeIndex === 0 ? <SelectCategory /> : null}
          {activeIndex === 1 ? <TopicDescription /> : null}
          {activeIndex === 2 ? <SelectOption /> : null}

          {/* Navigation Buttons */}
          <div className="max-w-3xl mx-auto flex justify-between items-center mt-12 pt-6 border-t border-slate-200 dark:border-slate-800">
            <Button
              disabled={activeIndex === 0}
              variant="outline"
              onClick={() => setActiveIndex((prev) => prev - 1)}
              className="px-6 rounded-xl dark:border-slate-800 dark:hover:bg-slate-900"
            >
              &larr; Back
            </Button>

            {activeIndex < 2 ? (
              <Button
                disabled={checkStatus()}
                onClick={() => setActiveIndex((prev) => prev + 1)}
                className="bg-primary hover:bg-primary/90 text-white px-8 rounded-xl font-medium shadow-xs"
              >
                Continue &rarr;
              </Button>
            ) : (
              <Button
                disabled={checkStatus() || loading}
                onClick={handleGenerateCourseLayout}
                className="bg-primary hover:bg-primary/90 text-white px-8 rounded-xl font-semibold shadow-md"
              >
                {loading ? "Generating Course..." : "✨ Generate Course Layout"}
              </Button>
            )}
          </div>
        </div>

        {/* Loading Modal */}
        <LoadingDialogue loading={loading} />
      </main>
    </div>
  );
}

export default CreateCourse;