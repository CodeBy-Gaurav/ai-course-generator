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
import {
  HiOutlineSparkles,
  HiOutlineAcademicCap,
  HiOutlineClock,
  HiOutlineVideoCamera,
  HiOutlineBookOpen,
} from "react-icons/hi2";

function SelectOption() {
  const { userCourseInput, setUserCourseInput } = useContext(userInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const difficultyLevels = [
    { value: "beginner", label: "Beginner", desc: "No prerequisites" },
    { value: "intermediate", label: "Intermediate", desc: "Core basics known" },
    { value: "advanced", label: "Advanced", desc: "Deep dive & architecture" },
    { value: "expert", label: "Expert", desc: "Production & optimization" },
  ];

  const durationOptions = [
    { value: "30-45 Minutes", label: "30-45m", sub: "Crash Course" },
    { value: "1-2 Hours", label: "1-2 Hours", sub: "Standard" },
    { value: "3-5 Hours", label: "3-5 Hours", sub: "Comprehensive" },
    { value: "Full Bootcamp", label: "Bootcamp", sub: "Multi-week" },
  ];

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Curriculum Specification &amp; Options
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
          Tailor pedagogical difficulty, pacing, and chapter granularity for this masterclass.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Controls */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          {/* Difficulty Level Pills */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5 flex items-center gap-1.5">
              <HiOutlineAcademicCap className="text-cyan-600 dark:text-cyan-400 text-base" />
              <span>Target Skill Level</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {difficultyLevels.map((lvl) => {
                const isSelected = (userCourseInput?.difficulty || "beginner") === lvl.value;
                return (
                  <button
                    key={lvl.value}
                    type="button"
                    onClick={() => handleInputChange("difficulty", lvl.value)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-cyan-500 bg-cyan-500/10 dark:bg-cyan-950/40 text-slate-900 dark:text-white shadow-xs"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="text-xs font-bold">{lvl.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{lvl.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Duration Pills */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5 flex items-center gap-1.5">
              <HiOutlineClock className="text-cyan-600 dark:text-cyan-400 text-base" />
              <span>Target Curriculum Duration</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {durationOptions.map((opt) => {
                const isSelected = (userCourseInput?.duration || "1-2 Hours") === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleInputChange("duration", opt.value)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-cyan-500 bg-cyan-500/10 dark:bg-cyan-950/40 text-slate-900 dark:text-white shadow-xs"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div className="text-xs font-bold">{opt.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{opt.sub}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Video Toggle & Chapter Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                <HiOutlineVideoCamera className="text-cyan-600 dark:text-cyan-400 text-base" />
                <span>Video Tutorials</span>
              </label>
              <Select
                value={userCourseInput?.video || "yes"}
                onValueChange={(value) => handleInputChange("video", value)}
              >
                <SelectTrigger className="w-full h-11 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                  <SelectValue placeholder="Select Video Option" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                  <SelectGroup>
                    <SelectItem value="yes">Yes (Curated Videos)</SelectItem>
                    <SelectItem value="no">Text &amp; Code Only</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                <HiOutlineBookOpen className="text-cyan-600 dark:text-cyan-400 text-base" />
                <span>Chapter Depth</span>
              </label>
              <Input
                type="number"
                min={2}
                max={8}
                className="h-11 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                value={userCourseInput?.chapters || 4}
                onChange={(e) =>
                  handleInputChange("chapters", Math.min(8, Math.max(2, parseInt(e.target.value) || 4)))
                }
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Between 2 and 8 chapters</span>
            </div>
          </div>
        </div>

        {/* Right: Real-time Curriculum Blueprint Summary */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <HiOutlineSparkles />
              Blueprint Preview
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Ready
            </span>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Target Course Topic
            </span>
            <h3 className="text-lg font-black text-white mt-0.5 line-clamp-2">
              {userCourseInput?.topic || "Untitled Masterclass"}
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              {userCourseInput?.description || "Curriculum outline structured with theory, code snippets, and matching tutorials."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Discipline</span>
              <span className="font-bold text-white truncate block mt-0.5">
                {userCourseInput?.category || "Programming"}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Skill Level</span>
              <span className="font-bold text-cyan-300 capitalize block mt-0.5">
                {userCourseInput?.difficulty || "Beginner"}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Pacing</span>
              <span className="font-bold text-white block mt-0.5">
                {userCourseInput?.duration || "1-2 Hours"}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Granularity</span>
              <span className="font-bold text-emerald-400 block mt-0.5">
                {userCourseInput?.chapters || 4} Lessons
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Pedagogical Engine:</span>
            <span className="font-mono text-cyan-300">Adaptive Curriculum Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectOption;

