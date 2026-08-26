import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { HiOutlineSparkles } from "react-icons/hi2";

function LoadingDialogue({ loading, status = "" }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="max-w-md rounded-3xl p-8 border border-purple-100 shadow-2xl bg-white/95 backdrop-blur-xl">
        <AlertDialogHeader className="hidden">
          <AlertDialogTitle>Generating Course</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription asChild>
          <div className="flex flex-col items-center justify-center text-center space-y-5 py-2">
            {/* Glowing Spinner */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-purple-100 border-t-primary animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-primary text-2xl">
                <HiOutlineSparkles className="animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Synthesizing Your Course
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto leading-relaxed">
                {status ||
                  "Google Gemini AI is crafting in-depth lesson notes, runnable code, and fetching HD video tutorials."}
              </p>
            </div>

            {/* Moving Gradient Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-primary via-purple-400 to-pink-500 h-full rounded-full animate-pulse w-full" />
            </div>

            <span className="text-[11px] font-mono text-purple-600 font-bold bg-purple-50 px-3 py-1 rounded-full">
              Parallel Multi-Thread Engine Active
            </span>
          </div>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadingDialogue;
