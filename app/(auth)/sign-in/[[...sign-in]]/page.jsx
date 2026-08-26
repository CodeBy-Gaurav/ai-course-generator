"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import {
  HiOutlineSparkles,
  HiOutlineVideoCamera,
  HiOutlineAcademicCap,
  HiOutlineArrowLeft,
} from "react-icons/hi2";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* Left Side: Branding & Value Props */}
        <div className="hidden lg:flex lg:col-span-6 xl:col-span-5 flex-col justify-between p-12 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-950 text-white relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-purple-200 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full backdrop-blur-xs"
            >
              <HiOutlineArrowLeft />
              Back to Home
            </Link>

            <div className="mt-16 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-purple-300 text-xs font-semibold uppercase tracking-wider">
                <HiOutlineSparkles />
                AI-Powered Learning
              </div>
              <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight">
                Unlock Your Personal Learning Journey.
              </h1>
              <p className="text-purple-200 text-base leading-relaxed max-w-md">
                Create structured, multi-chapter video masterclasses on any topic with the power of Google Gemini AI.
              </p>
            </div>
          </div>

          {/* Feature Bullets */}
          <div className="space-y-4 relative z-10 pt-10 border-t border-purple-800/50">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-800/60 text-purple-300 text-xl shrink-0">
                <HiOutlineSparkles />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Instant Curriculum Outlines</h4>
                <p className="text-xs text-purple-200 mt-0.5">
                  AI writes comprehensive lesson summaries and key takeaways.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-800/60 text-purple-300 text-xl shrink-0">
                <HiOutlineVideoCamera />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Automated Video Lessons</h4>
                <p className="text-xs text-purple-200 mt-0.5">
                  Embeds top-rated YouTube tutorials for every lesson.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-800/60 text-purple-300 text-xl shrink-0">
                <HiOutlineAcademicCap />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Interactive Code & Notes</h4>
                <p className="text-xs text-purple-200 mt-0.5">
                  Syntax-highlighted code blocks with 1-click copy.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-purple-300/80 relative z-10">
            &copy; {new Date().getFullYear()} AI Course Generator. All rights reserved.
          </p>
        </div>

        {/* Right Side: Clerk Sign In Form */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-6">
            <div className="lg:hidden mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors"
              >
                <HiOutlineArrowLeft />
                Back to Home
              </Link>
            </div>

            <div className="text-center lg:text-left space-y-1">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-500">
                Sign in to manage your AI courses and continue learning.
              </p>
            </div>

            <SignIn
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-white shadow-md border border-gray-100 rounded-2xl p-6",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton:
                    "border border-gray-200 text-gray-700 font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors",
                  socialButtonsBlockButtonText: "text-sm font-medium",
                  formFieldInput:
                    "border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm",
                  footerActionLink: "text-primary hover:text-primary/80 font-semibold",
                  formButtonPrimary:
                    "bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl py-2.5 shadow-sm transition-all",
                },
              }}
            />

            <p className="text-center text-xs text-gray-500 pt-2">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-primary font-semibold hover:underline"
              >
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}