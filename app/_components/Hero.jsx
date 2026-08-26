"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HiOutlineSparkles,
  HiOutlinePlayCircle,
  HiOutlineCodeBracket,
  HiOutlineBookOpen,
  HiOutlineCheckCircle,
  HiOutlineBolt,
  HiOutlineArrowRight,
} from "react-icons/hi2";

function Hero() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <section className="relative overflow-hidden bg-slate-50/50 dark:bg-slate-950 bg-grid-pattern pt-12 pb-20 lg:pt-20 lg:pb-32 transition-colors">
      {/* Background ambient radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-purple-500/20 via-pink-500/10 to-transparent dark:from-purple-900/30 dark:via-pink-950/20 dark:to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-purple-200/80 dark:border-purple-800/60 shadow-xs hover:border-primary/50 dark:hover:border-purple-500/50 transition-all cursor-pointer backdrop-blur-md group">
            <span className="flex h-2 w-2 rounded-full bg-primary dark:bg-purple-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Powered by <span className="text-primary dark:text-purple-400 font-bold">Google Gemini 3.6</span> &amp; YouTube API
            </span>
            <HiOutlineArrowRight className="text-xs text-slate-400 dark:text-slate-500 group-hover:translate-x-0.5 group-hover:text-primary dark:group-hover:text-purple-400 transition-all" />
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Turn Any Topic Into A Complete{" "}
            <span className="bg-gradient-to-r from-purple-600 via-primary to-pink-500 dark:from-purple-400 dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent animate-gradient-text">
              AI Video Course
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Generate comprehensive multi-chapter courses in seconds. Complete with structured curriculums, in-depth lesson notes, runnable code, and curated YouTube video masterclasses.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/create-course" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-13 px-8 text-base font-bold bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                <HiOutlineSparkles className="text-xl" />
                <span>Start Creating Free (5 Credits)</span>
              </Button>
            </Link>

            <Link href="/explore" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto h-13 px-7 text-base font-semibold border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900/80 rounded-2xl shadow-2xs flex items-center justify-center gap-2"
              >
                <HiOutlineBookOpen className="text-xl text-slate-500 dark:text-slate-400" />
                <span>Explore Community Courses</span>
              </Button>
            </Link>
          </div>

          {/* Social Proof / Trust metrics */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <HiOutlineBolt className="text-amber-500 text-base" />
              <span>4-Second Parallel Generation</span>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineCheckCircle className="text-green-500 text-base" />
              <span>100% Free Starter Plan</span>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlinePlayCircle className="text-primary dark:text-purple-400 text-base" />
              <span>Full HD Video Lessons</span>
            </div>
          </div>
        </div>

        {/* Interactive App Mockup Preview */}
        <div className="mt-14 sm:mt-20 max-w-5xl mx-auto">
          <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-purple-200/60 via-purple-50/40 to-white/60 dark:from-purple-900/40 dark:via-slate-900/80 dark:to-slate-950 border border-purple-200/70 dark:border-purple-800/40 shadow-2xl shadow-purple-900/20 backdrop-blur-xl">
            {/* Window header */}
            <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 dark:border-slate-800 text-white shadow-inner">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">
                    ai-course-generator // Python for Machine Learning
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-green-400 bg-green-950/80 border border-green-800/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                    Live AI Engine
                  </span>
                </div>
              </div>

              {/* Mockup Navigation Tabs */}
              <div className="flex items-center gap-1 px-4 pt-3 border-b border-slate-800/80 bg-slate-900/90 dark:bg-slate-950 text-xs">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-3.5 py-2 rounded-t-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "overview"
                      ? "bg-slate-800 dark:bg-slate-900 text-white border-t-2 border-primary dark:border-purple-400"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <HiOutlineBookOpen />
                  Curriculum Outline
                </button>
                <button
                  onClick={() => setActiveTab("video")}
                  className={`px-3.5 py-2 rounded-t-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "video"
                      ? "bg-slate-800 dark:bg-slate-900 text-white border-t-2 border-primary dark:border-purple-400"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <HiOutlinePlayCircle />
                  Video Masterclass
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`px-3.5 py-2 rounded-t-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "code"
                      ? "bg-slate-800 dark:bg-slate-900 text-white border-t-2 border-primary dark:border-purple-400"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <HiOutlineCodeBracket />
                  Interactive Code &amp; Notes
                </button>
              </div>

              {/* Mockup Tab Content */}
              <div className="p-6 sm:p-8 bg-slate-900 dark:bg-slate-950 min-h-[280px] sm:min-h-[340px]">
                {activeTab === "overview" && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          Python for Machine Learning &amp; Neural Networks
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Intermediate • 4 Lessons • Full Video Included
                        </p>
                      </div>
                      <span className="text-xs bg-primary/20 text-purple-300 font-semibold px-3 py-1 rounded-full border border-primary/30 w-fit">
                        Generated in 3.8s
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {[
                        { num: 1, title: "NumPy & Matrix Manipulations", time: "25 min" },
                        { num: 2, title: "Pandas Data Cleaning & Pipelines", time: "30 min" },
                        { num: 3, title: "Building Regression Models in Scikit-Learn", time: "35 min" },
                        { num: 4, title: "Neural Networks with PyTorch", time: "40 min" },
                      ].map((item) => (
                        <div
                          key={item.num}
                          className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 dark:bg-slate-900/60 border border-slate-750 dark:border-slate-800 hover:border-primary/40 dark:hover:border-purple-500/40 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-primary/20 text-purple-300 font-bold text-xs flex items-center justify-center">
                              {item.num}
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-slate-200">
                              {item.title}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {item.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "video" && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="relative rounded-2xl overflow-hidden bg-black aspect-video max-w-2xl mx-auto border border-slate-800 flex items-center justify-center group cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <HiOutlinePlayCircle className="text-3xl ml-0.5" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-left">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-purple-300 bg-purple-900/80 px-2 py-0.5 rounded">
                          Lesson 1 Video
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1">
                          NumPy Vectorized Operations &amp; Broadcasting Tutorial
                        </h4>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "code" && (
                  <div className="space-y-3 font-mono text-xs animate-in fade-in duration-300">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 space-y-2">
                      <div className="text-slate-500"># Step 1: Initialize PyTorch Neural Network Tensor</div>
                      <div className="text-purple-400">import <span className="text-white">torch</span></div>
                      <div className="text-purple-400">import <span className="text-white">torch.nn</span> as <span className="text-white">nn</span></div>
                      <div className="pt-2 text-blue-400">class <span className="text-yellow-300">MLModel</span>(nn.Module):</div>
                      <div className="pl-4 text-slate-300">def __init__(self, in_features, out_classes):</div>
                      <div className="pl-8 text-slate-400">super().__init__()</div>
                      <div className="pl-8 text-slate-300">self.linear = nn.Linear(in_features, 64)</div>
                      <div className="pl-8 text-slate-300">self.activation = nn.ReLU()</div>
                      <div className="pl-8 text-slate-300">self.out = nn.Linear(64, out_classes)</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;