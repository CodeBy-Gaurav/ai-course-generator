"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiOutlineSparkles, HiOutlineArrowRight } from "react-icons/hi2";

function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-10 sm:p-16 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
              <HiOutlineSparkles />
              Zero Credit Card Required
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Ready to generate your first AI course?
            </h2>

            <p className="text-purple-200 text-base sm:text-lg leading-relaxed">
              Join students, creators, and professionals learning 10x faster with AI-generated video masterclasses.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/create-course" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-13 px-8 text-base font-bold bg-white hover:bg-gray-100 text-purple-950 rounded-2xl shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2">
                  <span>Start Free Now</span>
                  <HiOutlineArrowRight className="text-lg" />
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
