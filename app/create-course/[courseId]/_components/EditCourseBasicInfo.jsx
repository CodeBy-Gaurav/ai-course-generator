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

function EditCourseBasicInfo({ course, refreshData }) {
  const courseData = normalizeCourse(course);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (courseData) {
      setName(courseData.name || "");
      setDescription(courseData.description || "");
    }
  }, [course]);

  const onUpdate = async () => {
    try {
      setLoading(true);

      const currentOutput = course?.courseOutput || {};
      const currentCourse = currentOutput?.course || currentOutput;

      const updatedOutput = {
        ...currentOutput,
        course: {
          ...currentCourse,
          name,
          description,
        },
      };

      await db
        .update(CourseList)
        .set({
          name,
          courseOutput: updatedOutput,
        })
        .where(eq(CourseList.id, course.id));

      if (refreshData) refreshData();
      setOpen(false);
    } catch (e) {
      console.error("Error updating course info:", e);
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
          <HiOutlinePencilSquare className="text-xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Edit Course Title & Description</DialogTitle>
          <DialogDescription>
            Modify the AI generated title and overview of this course.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <label className="text-xs font-semibold text-gray-700">
              Course Title
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 rounded-xl"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 h-32 rounded-xl resize-none"
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
            {loading ? "Saving..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCourseBasicInfo;
