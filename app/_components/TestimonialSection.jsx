"use client";
import React from "react";
import { HiOutlineStar, HiOutlineCheckBadge } from "react-icons/hi2";

const TESTIMONIALS = [
  {
    name: "Alex Rivera",
    role: "Senior Frontend Engineer",
    company: "FinTech Scaleup",
    course: "Fullstack Next.js & Turbopack",
    rating: 5,
    quote:
      "I used LearnGen Studio to generate an advanced masterclass on React 19 Server Actions. The curriculum was impeccably structured, and matching real YouTube tutorials saved me over 20 hours of manual research.",
    initials: "AR",
  },
  {
    name: "Dr. Priya Nair",
    role: "Associate Professor",
    company: "University of Tech",
    course: "Bioinformatics & Python",
    rating: 5,
    quote:
      "The modular breakdown and clear learning objectives helped me assemble supplementary study materials for my undergraduate students in minutes. A genuine game-changer for educational content curation.",
    initials: "PN",
  },
  {
    name: "Marcus Chen",
    role: "Self-Taught Developer",
    company: "Career Switcher",
    course: "Data Structures & LeetCode",
    rating: 5,
    quote:
      "Having practical code snippets and structured lesson notes right alongside the video tutorials gave me the confidence to pass technical interviews. The two-panel player is the cleanest learning interface I've used.",
    initials: "MC",
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-24 bg-slate-50/70 dark:bg-slate-950/70 border-t border-slate-200/80 dark:border-white/[0.08] transition-colors relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 dark:bg-cyan-950/60 border border-cyan-500/20 px-3.5 py-1 rounded-full">
            Trusted by Modern Learners
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Built for Students, Engineers &amp; Educators
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            See how developers and professionals accelerate their learning velocity using personalized AI masterclasses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Star rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <HiOutlineStar key={i} className="text-lg fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 font-bold text-xs flex items-center justify-center border border-cyan-500/20">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1">
                      <span>{item.name}</span>
                      <HiOutlineCheckBadge className="text-cyan-500 text-base" />
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.role} &bull; {item.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
