import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { userInputContext } from "@/app/_context/UserInputContext";
import { HiOutlineSparkles } from "react-icons/hi2";

const SUGGESTIONS = [
  "Python for Beginners",
  "React & Next.js Masterclass",
  "Personal Finance & Investing",
  "UI/UX Design with Figma",
  "Mindfulness & Daily Meditation",
  "Machine Learning Fundamentals",
];

function TopicDescription() {
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
          Course Topic &amp; Description
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Tell us what you want to learn. Be as specific as you like!
        </p>
      </div>

      <div className="space-y-6 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Course Topic <span className="text-red-500">*</span>
          </label>
          <Input
            required
            placeholder="e.g. Python for Beginners, Yoga for Flexibility, Stock Market Basics..."
            type="text"
            className="h-12 text-base px-4 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
            value={userCourseInput?.topic || ""}
            onChange={(e) => handleInputChange("topic", e.target.value)}
          />

          {/* Quick topic suggestion pills */}
          <div className="mt-3">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-2">
              <HiOutlineSparkles className="text-cyan-600 dark:text-cyan-400" /> Popular ideas:
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleInputChange("topic", suggestion)}
                  className="text-xs bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:bg-cyan-950/60 dark:hover:text-cyan-300 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full transition-colors font-medium cursor-pointer"
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Course Description (Optional)
          </label>
          <Textarea
            placeholder="Describe what specific areas or outcomes you want to focus on (e.g. Focus on practical real-world exercises and beginner-friendly syntax)..."
            rows={4}
            className="text-sm p-4 rounded-xl resize-none bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
            value={userCourseInput?.description || ""}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default TopicDescription;