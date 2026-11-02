import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import React, { useContext } from "react";
import { userInputContext } from "@/app/_context/UserInputContext";
import { HiCheckCircle } from "react-icons/hi2";

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(userInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto py-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Choose Your Discipline
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
          Select an academic or professional domain to tailor the curriculum engine&apos;s pedagogical depth.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CategoryList.map((item) => {
          const isSelected = userCourseInput?.category === item.name;
          return (
            <div
              key={item.id}
              onClick={() => handleCategoryChange(item.name)}
              className={`relative flex flex-col justify-between p-6 rounded-3xl border-2 cursor-pointer transition-all duration-200 group bg-white dark:bg-slate-900 ${
                isSelected
                  ? "border-cyan-500 bg-cyan-500/5 dark:bg-cyan-950/30 shadow-md shadow-cyan-500/10 scale-[1.02]"
                  : "border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 hover:bg-slate-50 dark:hover:bg-zinc-900 hover:shadow-xs"
              }`}
            >
              {isSelected && (
                <HiCheckCircle className="absolute top-4 right-4 text-cyan-600 dark:text-cyan-400 text-2xl animate-in zoom-in-75 duration-200" />
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 relative p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 group-hover:scale-105 transition-transform">
                    <Image
                      src={item.icon}
                      fill
                      alt={item.name}
                      className="object-contain p-2"
                    />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-0.5 rounded-full">
                    {item.tag || "Domain"}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                <span>{isSelected ? "Selected Discipline" : "Click to select"}</span>
                <span>&rarr;</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SelectCategory;