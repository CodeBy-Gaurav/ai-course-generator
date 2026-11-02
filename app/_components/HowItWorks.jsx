import React from "react";
import {
  HiOutlineLightBulb,
  HiOutlineSparkles,
  HiOutlineAcademicCap,
} from "react-icons/hi2";

function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Choose Topic & Preferences",
      description:
        "Select your category, type any topic (e.g. Next.js, Financial Accounting, Yoga), and pick your desired duration and chapter depth.",
      icon: <HiOutlineLightBulb className="text-2xl text-cyan-600 dark:text-cyan-400" />,
    },
    {
      step: "02",
      title: "Curriculum Architecture & Video Pairing",
      description:
        "Our intelligent curriculum engine structures comprehensive step-by-step lesson outlines while automatically matching top-rated video masterclasses.",
      icon: <HiOutlineSparkles className="text-2xl text-cyan-500 dark:text-cyan-400" />,
    },
    {
      step: "03",
      title: "Learn, Code & Share",
      description:
        "Study in the interactive two-panel player with syntax-highlighted code notes, video streaming, and shareable public links for your peers.",
      icon: <HiOutlineAcademicCap className="text-2xl text-emerald-500 dark:text-emerald-400" />,
    },
  ];

  return (
    <section className="py-24 bg-slate-50/70 dark:bg-slate-950/70 border-t border-slate-200/80 dark:border-white/[0.08] transition-colors relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 dark:bg-cyan-950/60 border border-cyan-500/20 px-3.5 py-1 rounded-full">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            How The Platform Works
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            From an initial prompt to an interactive multimedia learning experience in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/40 flex items-center justify-center border border-cyan-100 dark:border-cyan-900/40 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-200 dark:text-slate-800 group-hover:text-cyan-500/30 dark:group-hover:text-cyan-500/30 transition-colors font-mono">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
