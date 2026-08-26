import React from "react";
import { HiOutlineClock, HiOutlinePlay } from "react-icons/hi2";

function ChapterListCard({ chapter, index, isSelected = false }) {
  return (
    <div
      className={`p-3.5 rounded-2xl flex items-center gap-3 cursor-pointer transition-all duration-200 border ${
        isSelected
          ? "bg-purple-50/80 border-primary text-slate-900 shadow-xs ring-1 ring-primary/30 font-semibold"
          : "bg-white hover:bg-slate-50 border-slate-200/80 hover:border-slate-300"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-transform ${
          isSelected
            ? "bg-primary text-white shadow-xs scale-105"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        {isSelected ? <HiOutlinePlay className="text-xs ml-0.5" /> : index + 1}
      </div>

      <div className="overflow-hidden flex-1">
        <h4 className={`text-xs font-bold line-clamp-1 ${isSelected ? "text-primary" : "text-slate-800"}`}>
          {chapter?.name}
        </h4>
        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
          <HiOutlineClock className="text-xs text-slate-400" />
          <span>{chapter?.duration || "20 min"}</span>
        </p>
      </div>
    </div>
  );
}

export default ChapterListCard;
