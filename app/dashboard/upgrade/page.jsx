"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  HiOutlineCheck,
  HiOutlineShieldCheck,
  HiOutlineArrowLeft,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";
import Link from "next/link";

function UpgradePage() {
  return (
    <div className="max-w-5xl mx-auto py-6 space-y-10">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-cyan-400 transition-colors">
        <HiOutlineArrowLeft />
        <Link href="/dashboard">Back to Dashboard</Link>
      </div>

      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 dark:bg-cyan-950/60 border border-cyan-500/20 px-3.5 py-1 rounded-full">
          Simple Transparent Pricing
        </span>
        <h1 className="font-extrabold text-3xl md:text-5xl text-slate-900 dark:text-white tracking-tight">
          Supercharge Your Learning with Pro
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Upgrade to unlock unlimited AI course generations, priority high-speed processing, and high-definition video lessons.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
        {/* Free Tier */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-8 bg-white dark:bg-slate-950 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full">
              Free Starter
            </span>
            <div className="mt-2">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">₹0</span>
              <span className="text-slate-500 dark:text-slate-400 text-sm"> / forever</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Ideal for exploring AI course creation and testing the platform.
            </p>

            <ul className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2.5">
                <HiOutlineCheck className="text-green-500 text-lg shrink-0" />
                <span><strong>5 Masterclass Creation Credits</strong></span>
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlineCheck className="text-green-500 text-lg shrink-0" />
                <span>Modular multi-chapter syllabus generator</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlineCheck className="text-green-500 text-lg shrink-0" />
                <span>Curated video playlists &amp; lesson embeds</span>
              </li>
              <li className="flex items-center gap-2.5">
                <HiOutlineCheck className="text-green-500 text-lg shrink-0" />
                <span>Public shareable course links</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="outline"
              disabled
              className="w-full py-3 rounded-xl text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 cursor-default"
            >
              Current Active Plan (5 Credits)
            </Button>
          </div>
        </div>

        {/* Pro Unlimited Tier (₹499) */}
        <div className="border-2 border-cyan-500/80 rounded-3xl p-8 bg-gradient-to-b from-white via-sky-50/20 to-sky-50/40 dark:from-slate-950 dark:via-cyan-950/15 dark:to-zinc-950 shadow-xl shadow-cyan-500/5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary text-white text-[11px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider shadow-xs">
            Most Popular
          </div>

          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 dark:bg-cyan-950/60 border border-cyan-500/20 px-3 py-1 rounded-full">
              Pro Unlimited
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-5xl font-black text-slate-900 dark:text-white">₹499</span>
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium"> / month</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              For power learners, students, and educators who need limitless course creation.
            </p>

            <ul className="space-y-3.5 pt-6 border-t border-slate-100 dark:border-zinc-800 text-sm text-slate-700 dark:text-slate-200">
              <li className="flex items-center gap-2.5 font-semibold text-slate-900 dark:text-white">
                <HiOutlineCheck className="text-cyan-600 dark:text-cyan-400 text-xl shrink-0" />
                <span>Unlimited Course Creations</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <HiOutlineCheck className="text-cyan-600 dark:text-cyan-400 text-xl shrink-0" />
                <span>Instant High-Speed Parallel Pipeline</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <HiOutlineCheck className="text-cyan-600 dark:text-cyan-400 text-xl shrink-0" />
                <span>Custom Cloudinary Cover Art Uploads</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <HiOutlineCheck className="text-cyan-600 dark:text-cyan-400 text-xl shrink-0" />
                <span>Priority Curriculum Engine Processing</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <HiOutlineCheck className="text-cyan-600 dark:text-cyan-400 text-xl shrink-0" />
                <span>PDF &amp; Markdown Notes Export</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium">
                <HiOutlineShieldCheck className="text-cyan-600 dark:text-cyan-400 text-xl shrink-0" />
                <span>24/7 Dedicated Support</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 space-y-2 pt-4 border-t border-slate-100 dark:border-zinc-800">
            <Button className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]">
              <HiOutlineRocketLaunch className="text-xl" />
              <span>Upgrade to Pro — ₹499 / Month</span>
            </Button>
            <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
              Secure checkout. Cancel anytime with 1 click.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpgradePage;
