"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { normalizeCourse } from "@/lib/courseUtils";

function EditChapters({ course, index, refreshData }) {
  const courseData = normalizeCourse(course);
  const chapter = courseData?.chapters?.[index];

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (chapter) {
      setName(chapter.name || "");
      setAbout(chapter.about || "");
    }
  }, [chapter]);

  const onUpdate = async () => {
    try {
      setLoading(true);

      const chaptersList = [...(courseData?.chapters || [])];
      if (chaptersList[index]) {
        chaptersList[index] = {
          ...chaptersList[index],
          name,
          about,
        };
      }

      const currentOutput = course?.courseOutput || {};
      const currentCourse = currentOutput?.course || currentOutput;

      const updatedOutput = {
        ...currentOutput,
        course: {
          ...currentCourse,
          chapters: chaptersList,
        },
      };

      await db
        .update(CourseList)
        .set({
          courseOutput: updatedOutput,
        })
        .where(eq(CourseList.id, course.id));

      if (refreshData) refreshData();
      setOpen(false);
    } catch (e) {
      console.error("Error updating chapter:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-full"
        >
          <HiOutlinePencilSquare className="text-lg" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Edit Chapter {index + 1}</DialogTitle>
          <DialogDescription>
            Update the title and summary for this lesson.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <label className="text-xs font-semibold text-gray-700">
              Chapter Title
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 rounded-xl"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700">
              About Chapter
            </label>
            <Textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="mt-1 h-28 rounded-xl resize-none"
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={onUpdate}
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {loading ? "Saving..." : "Update Chapter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditChapters;
