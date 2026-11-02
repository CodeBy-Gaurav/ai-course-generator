"use client";
import React, { useRef } from "react";
import {
  HiOutlineSparkles,
  HiOutlineBolt,
  HiOutlineVideoCamera,
  HiOutlineCodeBracket,
  HiOutlinePhoto,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

function SpotlightCard({ children, className = "" }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card rounded-3xl transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

function FeaturesBento() {
  return (
    <section className="py-24 bg-background text-foreground border-t border-slate-100 dark:border-slate-850 relative z-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-wider">
            <HiOutlineSparkles />
            Next-Gen Architecture
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
          <SpotlightCard className="md:col-span-2 p-8 bg-gradient-to-br from-slate-950 via-zinc-950 to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/25 transition-all" />

            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-300 flex items-center justify-center text-2xl border border-cyan-500/30">
                <HiOutlineBolt />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold">
                High-Speed Curriculum Pipeline
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Assemble 6-Lesson Masterclasses in &lt; 5 Seconds
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Our parallel async pipeline structures all chapter modules, hands-on notes, and video tutorials concurrently.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center relative z-10">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <div className="text-xl sm:text-2xl font-black text-white">4.2s</div>
                <div className="text-[11px] text-slate-400 font-medium">Avg Assembly Time</div>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <div className="text-xl sm:text-2xl font-black text-cyan-300">100%</div>
                <div className="text-[11px] text-slate-400 font-medium">Standardized Schema</div>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <div className="text-xl sm:text-2xl font-black text-emerald-400">Adaptive</div>
                <div className="text-[11px] text-slate-400 font-medium">Curriculum Engine</div>
              </div>
            </div>
          </SpotlightCard>

          {/* Bento Item 2: Automated Video Curations */}
          <SpotlightCard className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-primary/50 dark:hover:border-cyan-500/50 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center text-2xl">
                <HiOutlineVideoCamera />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-400 font-bold">
                Curated Video Playlists
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Structured Video Masterclasses
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Connects each chapter directly to top-rated video masterclasses and curated playlists, eliminating the need to search for explanations manually.
              </p>
            </div>

            <div className="mt-6 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center text-sm font-bold">
                ▶
              </div>
              <div className="text-xs">
                <div className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">HD Video Embeds</div>
                <div className="text-slate-500 dark:text-slate-400 text-[10px]">Zero Ads &bull; Integrated Player</div>
              </div>
            </div>
          </SpotlightCard>

          {/* Bento Item 3: Code Blocks & Syntax Notes */}
          <SpotlightCard className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-primary/50 dark:hover:border-cyan-500/50 group">
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
              <span className="text-cyan-400">const</span> course = <span className="text-emerald-400">&quot;Ready&quot;</span>;
            </div>
          </SpotlightCard>

          {/* Bento Item 4: AI Banners & Cloudinary Sync */}
          <SpotlightCard className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-primary/50 dark:hover:border-cyan-500/50 group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center text-2xl">
                <HiOutlinePhoto />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400 font-bold">
                Course Artwork
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Curated High-Res Artwork
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Every course automatically receives an aesthetic, category-matched visual cover with custom upload support.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-primary dark:text-cyan-400">
              <span>Cloudinary CDN Sync &bull; 4K Support</span>
            </div>
          </SpotlightCard>

          {/* Bento Item 5: Community Marketplace & Shareable URLs */}
          <SpotlightCard className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-primary/50 dark:hover:border-cyan-500/50 group">
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
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}

export default FeaturesBento;
