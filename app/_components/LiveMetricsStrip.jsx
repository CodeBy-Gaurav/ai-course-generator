"use client";
import React from "react";
import {
  HiOutlineBolt,
  HiOutlineAcademicCap,
  HiOutlineStar,
  HiOutlineCpuChip,
} from "react-icons/hi2";

export default function LiveMetricsStrip() {
  const metrics = [
    {
      value: "12,400+",
      label: "Masterclasses Generated",
      sub: "Across 40+ subject domains",
      icon: <HiOutlineAcademicCap className="text-xl text-cyan-600 dark:text-cyan-400" />,
    },
    {
      value: "4.2s",
      label: "Parallel Assembly Speed",
      sub: "Instant video playlist & notes sync",
      icon: <HiOutlineBolt className="text-xl text-emerald-600 dark:text-emerald-400" />,
    },
    {
      value: "99.2%",
      label: "Curriculum Accuracy",
      sub: "Structured modular pedagogy",
      icon: <HiOutlineCpuChip className="text-xl text-sky-600 dark:text-sky-400" />,
    },
    {
      value: "4.9 / 5.0",
      label: "Learner Satisfaction",
      sub: "Based on 3,800+ course reviews",
      icon: <HiOutlineStar className="text-xl text-amber-500" />,
    },
  ];

  return (
    <section className="relative z-10 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] shadow-xl shadow-slate-900/5">
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
              {item.icon}
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {item.value}
              </div>
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-snug">
                {item.label}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 hidden sm:block">
                {item.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
