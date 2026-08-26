import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { userInputContext } from "@/app/_context/UserInputContext";

function SelectOption() {
  const { userCourseInput, setUserCourseInput } = useContext(userInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Course Customization &amp; Options
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize difficulty, duration, video inclusion, and chapter depth.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
            🎓 Difficulty Level
          </label>
          <Select
            value={userCourseInput?.difficulty || "beginner"}
            onValueChange={(value) => handleInputChange("difficulty", value)}
          >
            <SelectTrigger className="w-full h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
              <SelectValue placeholder="Select Difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
              <SelectGroup>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
            ⏱️ Course Duration
          </label>
          <Select
            value={userCourseInput?.duration || "1 Hour"}
            onValueChange={(value) => handleInputChange("duration", value)}
          >
            <SelectTrigger className="w-full h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
              <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
              <SelectGroup>
                <SelectItem value="1 Hour">1 Hour</SelectItem>
                <SelectItem value="2 Hours">2 Hours</SelectItem>
                <SelectItem value="3+ Hours">3+ Hours</SelectItem>
                <SelectItem value="4 Weeks">4 Weeks Comprehensive</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
            ▶️ Include YouTube Video Lessons?
          </label>
          <Select
            value={userCourseInput?.video || "yes"}
            onValueChange={(value) => handleInputChange("video", value)}
          >
            <SelectTrigger className="w-full h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
              <SelectValue placeholder="Select Video Option" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
              <SelectGroup>
                <SelectItem value="yes">Yes (Recommended)</SelectItem>
                <SelectItem value="no">No (Text &amp; Code only)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
            📑 Number of Chapters
          </label>
          <Input
            type="number"
            min={1}
            max={10}
            className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
            value={userCourseInput?.chapters || 4}
            onChange={(e) =>
              handleInputChange("chapters", parseInt(e.target.value) || 4)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default SelectOption;
