"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiOutlineSparkles, HiOutlineArrowRight } from "react-icons/hi2";

function CTASection() {
  return (
    <section className="py-20 bg-background text-foreground transition-colors relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-10 sm:p-16 bg-gradient-to-r from-zinc-950 via-slate-900 to-zinc-950 text-white overflow-hidden shadow-2xl border border-cyan-500/30 beam-border-top">
          {/* Subtle background ambient glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 dark:bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <HiOutlineSparkles className="text-amber-300" />
              <span>5 Free Generation Credits &bull; No Credit Card</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              Ready to generate your first AI course?
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Join students, creators, and professionals learning 10x faster with AI-generated video masterclasses in seconds.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/create-course" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-13 px-8 text-base font-bold bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2">
                  <span>Start Free Now</span>
                  <HiOutlineArrowRight className="text-lg" />
                </Button>
              </Link>
              <Link href="/explore" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-13 px-8 text-base font-semibold border-white/20 hover:bg-white/10 text-white rounded-2xl transition-all"
                >
                  Explore Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
