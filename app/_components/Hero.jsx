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
  HiOutlineClipboardDocument,
  HiOutlineCheck,
} from "react-icons/hi2";
import CyberNetBackground from "./CyberNetBackground";

const SAMPLE_COURSES = {
  nextjs: {
    title: "Fullstack Next.js 15 SaaS with React 19",
    category: "Programming",
    level: "Intermediate",
    time: "3.8s",
    duration: "2 Hours",
    videoTitle: "Next.js 15 Server Actions, Turbopack & React 19 Streaming Masterclass",
    chapters: [
      { num: 1, title: "App Router & Turbopack Core Architecture", time: "25 min" },
      { num: 2, title: "Server Actions & Streaming Suspense Boundaries", time: "30 min" },
      { num: 3, title: "PostgreSQL with Drizzle ORM & Neon Integration", time: "35 min" },
      { num: 4, title: "Production Deployment on Vercel with Custom Domains", time: "30 min" },
    ],
    code: `// app/api/course/route.js (Next.js 15 Server Action)
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";

export async function POST(req) {
  const { topic, category } = await req.json();
  const curriculum = await generateAILessons(topic);
  
  const [course] = await db.insert(CourseList).values({
    name: topic,
    category,
    courseOutput: curriculum,
  }).returning();

  return Response.json({ success: true, courseId: course.id });
}`,
  },
  ai: {
    title: "Python for Deep Learning & Neural Networks",
    category: "AI & Data Science",
    level: "Advanced",
    time: "4.2s",
    duration: "3 Hours",
    videoTitle: "PyTorch 2.0 Complete Neural Network Architecture Deep Dive",
    chapters: [
      { num: 1, title: "Tensors & Vectorized Matrix Computations", time: "30 min" },
      { num: 2, title: "Convolutional Layers & Computer Vision", time: "45 min" },
      { num: 3, title: "Attention Mechanism & Transformers from Scratch", time: "50 min" },
      { num: 4, title: "Model Fine-Tuning & Quantization on GPU", time: "40 min" },
    ],
    code: `# PyTorch 2.0 Deep Neural Network Architecture
import torch
import torch.nn as nn

class TransformerClassifier(nn.Module):
    def __init__(self, vocab_size=50000, embed_dim=256, num_heads=8):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.encoder_layer = nn.TransformerEncoderLayer(d_model=embed_dim, nhead=num_heads)
        self.classifier = nn.Linear(embed_dim, 2)
        
    def forward(self, x):
        tokens = self.embedding(x)
        out = self.encoder_layer(tokens)
        return self.classifier(out.mean(dim=1))`,
  },
  trading: {
    title: "Algorithmic Trading & Quantitative Finance",
    category: "Finance & Fintech",
    level: "Intermediate",
    time: "4.0s",
    duration: "2.5 Hours",
    videoTitle: "Building Python Trading Bots with Backtrader & Interactive Brokers",
    chapters: [
      { num: 1, title: "Market Microstructure & Order Book Dynamics", time: "30 min" },
      { num: 2, title: "Mean Reversion & Statistical Arbitrage Strategies", time: "40 min" },
      { num: 3, title: "Vectorized Backtesting & Risk Metric Sharpe Ratios", time: "35 min" },
      { num: 4, title: "Live Execution via REST Webhooks & WebSockets", time: "35 min" },
    ],
    code: `# Quantitative Mean Reversion Strategy Backtest
import pandas as pd
import numpy as np

def calculate_bollinger_signals(df, window=20, num_std=2):
    df['SMA'] = df['close'].rolling(window=window).mean()
    df['STD'] = df['close'].rolling(window=window).std()
    df['Upper'] = df['SMA'] + (df['STD'] * num_std)
    df['Lower'] = df['SMA'] - (df['STD'] * num_std)
    df['Signal'] = np.where(df['close'] < df['Lower'], 1, 0)
    return df`,
  },
};

function Hero() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedKey, setSelectedKey] = useState("nextjs");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeCourse = SAMPLE_COURSES[selectedKey];

  const handleSimulate = (key) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);

    setTimeout(() => setSimStep(2), 250);
    setTimeout(() => setSimStep(3), 500);
    setTimeout(() => {
      setSelectedKey(key);
      setIsSimulating(false);
      setSimStep(0);
    }, 800);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeCourse.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-background text-foreground pt-12 pb-20 lg:pt-20 lg:pb-32 transition-colors">
      {/* 1. Cyber Net Canvas Background */}
      <CyberNetBackground />

      {/* 2. Ambient Gradient Light Cones */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-cyan-500/15 via-blue-500/10 to-transparent dark:from-cyan-900/25 dark:via-blue-950/20 dark:to-transparent blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-900/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/[0.08] shadow-xs hover:border-primary/50 dark:hover:border-cyan-500/50 transition-all cursor-pointer backdrop-blur-md group">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Next-Gen Learning Engine &bull; <span className="text-primary dark:text-cyan-400 font-bold">Curated Video &amp; Practical Notes</span>
            </span>
            <HiOutlineArrowRight className="text-xs text-slate-400 dark:text-slate-500 group-hover:translate-x-0.5 group-hover:text-primary dark:group-hover:text-cyan-400 transition-all" />
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.08]">
            Master Any Skill with Structured{" "}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-text">
              Video Masterclasses
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Assemble comprehensive multi-chapter courses in seconds. Complete with tailored curriculums, in-depth lesson notes, runnable code, and high-definition video masterclasses.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/create-course" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-13 px-8 text-base font-bold bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer">
                <HiOutlineSparkles className="text-xl" />
                <span>Start Learning Free (5 Credits)</span>
              </Button>
            </Link>

            <Link href="/explore" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto h-13 px-7 text-base font-semibold border-slate-200 dark:border-white/[0.08] hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
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
              <span>Instant Parallel Assembly</span>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineCheckCircle className="text-emerald-500 text-base" />
              <span>100% Free Starter Tier</span>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlinePlayCircle className="text-primary dark:text-cyan-400 text-base" />
              <span>Full HD Video Lessons</span>
            </div>
          </div>
        </div>

        {/* Interactive App Mockup Preview with Live Prompt Simulator */}
        <div className="mt-14 sm:mt-20 max-w-5xl mx-auto">
          {/* Quick Prompt Simulator Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 px-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary dark:bg-cyan-400 animate-ping" />
              Interactive Curriculum Sandbox:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSimulate("nextjs")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedKey === "nextjs"
                    ? "bg-primary text-white shadow-md shadow-cyan-500/25"
                    : "bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:border-primary/50"
                }`}
              >
                ⚡ Next.js 15 Fullstack
              </button>
              <button
                onClick={() => handleSimulate("ai")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedKey === "ai"
                    ? "bg-primary text-white shadow-md shadow-cyan-500/25"
                    : "bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:border-primary/50"
                }`}
              >
                🧠 PyTorch Neural Nets
              </button>
              <button
                onClick={() => handleSimulate("trading")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedKey === "trading"
                    ? "bg-primary text-white shadow-md shadow-cyan-500/25"
                    : "bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:border-primary/50"
                }`}
              >
                📈 Algo Trading
              </button>
            </div>
          </div>

          {/* Main Mockup Window Container with Beam Border */}
          <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-slate-200/50 via-slate-100/30 to-white/50 dark:from-zinc-900/40 dark:via-zinc-950/80 dark:to-black border border-slate-200/80 dark:border-white/[0.08] shadow-2xl shadow-cyan-950/20 backdrop-blur-xl beam-border-top">
            {/* Terminal Window Header */}
            <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 text-white shadow-inner">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400 truncate max-w-[280px] sm:max-w-none">
                    ai-course-generator // {activeCourse.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Interactive Sandbox
                  </span>
                </div>
              </div>

              {/* Progress Simulation Bar when switching */}
              {isSimulating && (
                <div className="bg-slate-900 px-4 py-2 border-b border-slate-850 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between text-[11px] text-cyan-300 font-mono mb-1">
                    <span>
                      {simStep === 1 && "Synthesizing curriculum structure..."}
                      {simStep === 2 && "Curating HD video playlists & lessons..."}
                      {simStep === 3 && "Generating runnable code snippets..."}
                    </span>
                    <span>{simStep * 33}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${simStep * 33}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Mockup Navigation Tabs */}
              <div className="flex items-center gap-1 px-4 pt-3 border-b border-slate-800/80 bg-slate-900/90 dark:bg-slate-950 text-xs">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-3.5 py-2 rounded-t-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeTab === "overview"
                      ? "bg-slate-800 dark:bg-slate-900 text-white border-t-2 border-primary dark:border-cyan-400"
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
                      ? "bg-slate-800 dark:bg-slate-900 text-white border-t-2 border-primary dark:border-cyan-400"
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
                      ? "bg-slate-800 dark:bg-slate-900 text-white border-t-2 border-primary dark:border-cyan-400"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <HiOutlineCodeBracket />
                  Interactive Code &amp; Notes
                </button>
              </div>

              {/* Mockup Tab Content Area */}
              <div className="p-6 sm:p-8 bg-slate-900 dark:bg-slate-950 min-h-[300px] sm:min-h-[340px]">
                {activeTab === "overview" && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {activeCourse.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {activeCourse.level} • {activeCourse.chapters.length} Lessons • {activeCourse.duration} • Full Video Included
                        </p>
                      </div>
                      <span className="text-xs bg-cyan-500/10 text-cyan-300 font-semibold px-3 py-1 rounded-full border border-cyan-500/30 w-fit">
                        Generated in {activeCourse.time}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {activeCourse.chapters.map((item) => (
                        <div
                          key={item.num}
                          className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 dark:bg-slate-900/60 border border-slate-750 dark:border-slate-800 hover:border-cyan-500/40 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-300 font-bold text-xs flex items-center justify-center border border-cyan-500/20">
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
                    <div className="relative rounded-2xl overflow-hidden bg-black aspect-video max-w-2xl mx-auto border border-slate-800 flex items-center justify-center group cursor-pointer shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <HiOutlinePlayCircle className="text-3xl ml-0.5" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-left">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-300 bg-cyan-950/90 border border-cyan-800/80 px-2 py-0.5 rounded font-mono">
                          Lesson 1 HD Tutorial Embed
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1">
                          {activeCourse.videoTitle}
                        </h4>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "code" && (
                  <div className="space-y-3 font-mono text-xs animate-in fade-in duration-300">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 space-y-2 relative group">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-850 text-slate-400">
                        <span className="text-[11px]">Executable Lesson Snippet</span>
                        <button
                          onClick={handleCopyCode}
                          className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <HiOutlineCheck className="text-green-400" />
                              <span className="text-green-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <HiOutlineClipboardDocument />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="overflow-x-auto text-xs leading-relaxed text-slate-300">
                        <code>{activeCourse.code}</code>
                      </pre>
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
