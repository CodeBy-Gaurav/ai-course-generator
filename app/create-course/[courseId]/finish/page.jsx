"use client";
import React, { useEffect, useState, use } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { HiOutlineCheckCircle, HiOutlineSquare2Stack } from "react-icons/hi2";
import Link from "next/link";

function FinishScreen({ params }) {
  const resolvedParams = use(params);
  const { user } = useUser();
  const [course, setCourse] = useState();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (resolvedParams?.courseId && user) {
      getCourse();
    }
  }, [resolvedParams, user]);

  const getCourse = async () => {
    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      if (!userEmail) return;

      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, resolvedParams.courseId),
            eq(CourseList.createdBy, userEmail)
          )
        );

      if (result && result.length > 0) {
        setCourse(result[0]);
      }
    } catch (err) {
      console.error("Error fetching course:", err);
    }
  };

  const courseUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/course/${course?.courseId}`
      : `${process.env.NEXT_PUBLIC_HOST_NAME || "http://localhost:3000"}/course/${course?.courseId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(courseUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error("Failed to copy URL:", e);
    }
  };

  return (
    <div className="px-6 md:px-20 lg:px-44 my-10 pb-20">
      <div className="flex flex-col items-center text-center space-y-3">
        <HiOutlineCheckCircle className="text-6xl text-green-500" />
        <h2 className="font-bold text-3xl text-gray-900">
          Congrats! Your course is ready!
        </h2>
        <p className="text-gray-500 text-sm max-w-md">
          Your AI-generated course with interactive chapters and video tutorials is now fully generated and published.
        </p>
      </div>

      {course && (
        <div className="mt-8">
          <CourseBasicInfo course={course} refreshData={getCourse} edit={false} />

          <div className="mt-6 p-5 border rounded-xl bg-white space-y-3">
            <h3 className="font-medium text-sm text-gray-700">Course Shareable URL</h3>
            <div className="flex items-center gap-3">
              <input
                type="text"
                readOnly
                value={courseUrl}
                className="w-full p-2.5 text-sm bg-gray-50 border rounded-lg text-gray-600 focus:outline-none"
              />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <HiOutlineSquare2Stack />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full">
                Back to Dashboard
              </Button>
            </Link>
            <Link href={`/course/${course?.courseId}/start`} className="w-full sm:w-auto">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                Start Learning Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinishScreen;
