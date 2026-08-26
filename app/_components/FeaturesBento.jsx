"use client";
import React from "react";
import {
  HiOutlineSparkles,
  HiOutlineBolt,
  HiOutlineVideoCamera,
  HiOutlineCodeBracket,
  HiOutlinePhoto,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

function FeaturesBento() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-850 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 dark:bg-purple-950/60 text-primary dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
            <HiOutlineSparkles />
            Architecture &amp; Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Engineered for Fast, Deep Learning
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Everything you need to transform complex subjects into structured, step-by-step masterclasses with rich media.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Item 1 (Wide 2-col): High-Speed Parallel Generation */}
          <div className="md:col-span-2 rounded-3xl p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950 text-white border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/30 transition-all" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-purple-300 flex items-center justify-center text-2xl border border-primary/30">
                <HiOutlineBolt />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-purple-300 font-bold">
                Parallel AI Pipeline
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Synthesize 6-Lesson Curriculums in &lt; 5 Seconds
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Instead of slow serial generation, our parallel async pipeline generates all chapter lessons, code samples, and video searches concurrently.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center relative z-10">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <div className="text-xl sm:text-2xl font-black text-white">4.2s</div>
                <div className="text-[11px] text-slate-400 font-medium">Avg Generation Time</div>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <div className="text-xl sm:text-2xl font-black text-purple-300">100%</div>
                <div className="text-[11px] text-slate-400 font-medium">JSON Structured Schema</div>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <div className="text-xl sm:text-2xl font-black text-pink-400">Gemini 3.6</div>
                <div className="text-[11px] text-slate-400 font-medium">Intelligence Core</div>
              </div>
            </div>
          </div>

          {/* Bento Item 2: Automated YouTube Curations */}
          <div className="rounded-3xl p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-primary/50 dark:hover:border-purple-500/50 transition-colors group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center text-2xl">
                <HiOutlineVideoCamera />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-400 font-bold">
                Video Integration
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Smart YouTube Lesson Matching
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Connects each chapter directly to top-rated YouTube tutorials, eliminating the need to search for video explanations manually.
              </p>
            </div>

            <div className="mt-6 p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center text-sm font-bold">
                ▶
              </div>
              <div className="text-xs">
                <div className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">HD Video Embeds</div>
                <div className="text-slate-500 dark:text-slate-400 text-[10px]">Zero Ads &bull; Integrated Player</div>
              </div>
            </div>
          </div>

          {/* Bento Item 3: Code Blocks & Syntax Notes */}
          <div className="rounded-3xl p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-primary/50 dark:hover:border-purple-500/50 transition-colors group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl">
                <HiOutlineCodeBracket />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">
                Interactive Notes
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Syntax Highlighting &amp; Copy Code
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Programming courses come with formatted code blocks, 1-click clipboard copy, and comprehensive concept breakdowns.
              </p>
            </div>

            <div className="mt-6 p-3 bg-slate-900 dark:bg-slate-950 text-slate-200 font-mono text-[11px] rounded-xl border border-slate-800">
              <span className="text-purple-400">const</span> course = <span className="text-green-400">&quot;Ready&quot;</span>;
            </div>
          </div>

          {/* Bento Item 4: AI Banners & Cloudinary Sync */}
          <div className="rounded-3xl p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-primary/50 dark:hover:border-purple-500/50 transition-colors group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center text-2xl">
                <HiOutlinePhoto />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-pink-600 dark:text-pink-400 font-bold">
                Visual Banners
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Automated High-Res Thumbnails
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Every generated course automatically receives an eye-catching, category-matched thumbnail banner with custom Cloudinary upload support.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-primary dark:text-purple-400">
              <span>Cloudinary CDN Sync &bull; 4K Support</span>
            </div>
          </div>

          {/* Bento Item 5: Community Marketplace & Shareable URLs */}
          <div className="rounded-3xl p-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-primary/50 dark:hover:border-purple-500/50 transition-colors group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl">
                <HiOutlineGlobeAlt />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
                Share &amp; Explore
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                1-Click Public URLs &amp; Marketplace
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Share courses with friends or students via unique URLs that require zero login to view, or browse community courses in the Explore tab.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>Public Access &bull; Search &amp; Filter</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesBento;
