import React from "react";
import { HiOutlineClock, HiOutlinePlay, HiOutlineCheckCircle } from "react-icons/hi2";

function ChapterListCard({ chapter, index, isSelected = false, isCompleted = false }) {
  return (
    <div
      className={`p-3.5 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all duration-200 border ${
        isSelected
          ? "bg-cyan-500/10 dark:bg-cyan-950/40 border-cyan-500 text-slate-900 dark:text-white shadow-xs ring-1 ring-cyan-500/30 font-semibold"
          : "bg-white dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800/80 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
      }`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-transform ${
            isCompleted
              ? "bg-emerald-500 text-white shadow-xs"
              : isSelected
              ? "bg-cyan-500 text-white shadow-xs scale-105"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          }`}
        >
          {isCompleted ? (
            <HiOutlineCheckCircle className="text-base" />
          ) : isSelected ? (
            <HiOutlinePlay className="text-xs ml-0.5" />
          ) : (
            index + 1
          )}
        </div>

        <div className="overflow-hidden flex-1">
          <h4
            className={`text-xs font-bold line-clamp-1 ${
              isSelected ? "text-cyan-700 dark:text-cyan-300" : "text-slate-800 dark:text-slate-200"
            }`}
          >
            {chapter?.name}
          </h4>
          <p className="text-[11px] text-slate-400 dark:text-slate-400 flex items-center gap-1 mt-0.5">
            <HiOutlineClock className="text-xs text-slate-400 dark:text-slate-400" />
            <span>{chapter?.duration || "20 min"}</span>
          </p>
        </div>
      </div>

      {isCompleted && (
        <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">
          Done
        </span>
      )}
    </div>
  );
}

export default ChapterListCard;
