"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  HiOutlineCheck,
  HiOutlineRocketLaunch,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import Link from "next/link";

function PricingSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-850 transition-colors" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-purple-300 bg-primary/10 dark:bg-purple-950/60 px-3.5 py-1 rounded-full">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Start Free. Upgrade Anytime.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Every account starts with 5 complimentary full-course generation credits. No credit card required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 bg-white dark:bg-slate-950 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full">
                Starter Tier
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">₹0</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm"> / forever</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Perfect for students and enthusiasts creating their first AI courses.
              </p>

              <ul className="space-y-3.5 pt-6 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2.5">
                  <HiOutlineCheck className="text-green-500 text-lg shrink-0" />
                  <span><strong>5 Course Generation Credits</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <HiOutlineCheck className="text-green-500 text-lg shrink-0" />
                  <span>Modular multi-chapter syllabus generator</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <HiOutlineCheck className="text-green-500 text-lg shrink-0" />
                  <span>Curated YouTube video lesson embeds</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <HiOutlineCheck className="text-green-500 text-lg shrink-0" />
                  <span>Public shareable URLs for courses</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link href="/create-course" className="block">
                <Button
                  variant="outline"
                  className="w-full py-3 rounded-xl font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 border-slate-300 dark:border-slate-700"
                >
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>

          {/* Pro Unlimited Tier (₹499) */}
          <div className="border-2 border-primary dark:border-purple-500 rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-white via-purple-50/20 to-purple-50/60 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-900 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-white text-[11px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider shadow-xs">
              Popular
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-purple-300 bg-primary/10 dark:bg-purple-950/60 px-3 py-1 rounded-full">
                Pro Unlimited
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-5xl font-black text-slate-900 dark:text-white">₹499</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium"> / month</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                For educators, professionals, and power learners requiring unlimited creation.
              </p>

              <ul className="space-y-3.5 pt-6 border-t border-purple-100 dark:border-purple-900/50 text-sm text-slate-700 dark:text-slate-200">
                <li className="flex items-center gap-2.5 font-semibold text-slate-900 dark:text-white">
                  <HiOutlineCheck className="text-primary dark:text-purple-400 text-xl shrink-0" />
                  <span>Unlimited AI Course Generations</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium">
                  <HiOutlineCheck className="text-primary dark:text-purple-400 text-xl shrink-0" />
                  <span>4-Second Parallel Generation Pipeline</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium">
                  <HiOutlineCheck className="text-primary dark:text-purple-400 text-xl shrink-0" />
                  <span>Custom Cloudinary Image Uploads</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium">
                  <HiOutlineCheck className="text-primary dark:text-purple-400 text-xl shrink-0" />
                  <span>Priority Google Gemini AI Processing</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium">
                  <HiOutlineShieldCheck className="text-primary dark:text-purple-400 text-xl shrink-0" />
                  <span>24/7 Priority Support</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-purple-100 dark:border-purple-900/50">
              <Link href="/dashboard/upgrade" className="block">
                <Button className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]">
                  <HiOutlineRocketLaunch className="text-xl" />
                  <span>Upgrade to Pro — ₹499/mo</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
