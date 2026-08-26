"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  HiOutlinePuzzlePiece,
  HiOutlinePhoto,
} from "react-icons/hi2";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { uploadImageToCloudinary } from "@/configs/CloudinaryUpload";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { normalizeCourse } from "@/lib/courseUtils";
import { resolveBannerUrl } from "@/lib/bannerGenerator";

function CourseBasicInfo({ course, refreshData, edit = true }) {
  const courseData = normalizeCourse(course);
  const [selectedFile, setSelectedFile] = useState();
  const [uploading, setUploading] = useState(false);

  const bannerUrl = selectedFile || resolveBannerUrl(course);

  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setSelectedFile(URL.createObjectURL(file));

    try {
      setUploading(true);
      const downloadUrl = await uploadImageToCloudinary(file);

      await db
        .update(CourseList)
        .set({ courseBanner: downloadUrl })
        .where(eq(CourseList.id, course?.id));

      if (refreshData) refreshData();
    } catch (err) {
      console.error("Failed to upload image to Cloudinary:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xs mt-5 bg-white dark:bg-slate-900 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white leading-tight">
              {courseData?.name || course?.name}
            </h2>
            {edit && (
              <EditCourseBasicInfo
                course={course}
                refreshData={refreshData}
              />
            )}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            {courseData?.description}
          </p>
          <div className="flex items-center gap-2 mt-4 text-primary dark:text-purple-400 font-semibold text-sm">
            <HiOutlinePuzzlePiece className="text-lg" />
            <span className="capitalize">{courseData?.category}</span>
          </div>

          {!edit && (
            <Link href={`/course/${course?.courseId}/start`}>
              <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-xl shadow-sm">
                Start Learning Now &rarr;
              </Button>
            </Link>
          )}
        </div>

        <div className="flex flex-col items-center justify-center">
          <label
            htmlFor={edit ? "upload-image" : undefined}
            className={`relative w-full h-[240px] md:h-[280px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner flex items-center justify-center bg-slate-100 dark:bg-slate-800 ${
              edit ? "cursor-pointer hover:opacity-95 transition-opacity" : ""
            }`}
          >
            <Image
              src={bannerUrl}
              alt="Course Banner"
              fill
              className="object-cover rounded-2xl"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {edit && (
              <div className="absolute inset-0 bg-black/40 hover:bg-black/50 flex flex-col items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity gap-2">
                <HiOutlinePhoto className="text-3xl" />
                <p className="text-xs font-semibold bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-xs">
                  {uploading ? "Uploading..." : "Click to Upload Custom Banner"}
                </p>
              </div>
            )}
          </label>

          {edit && (
            <input
              type="file"
              id="upload-image"
              className="hidden"
              accept="image/*"
              onChange={onFileSelected}
              disabled={uploading}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
