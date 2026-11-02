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
      <AlertDialogContent className="max-w-md rounded-3xl p-8 border border-cyan-500/30 dark:border-white/[0.12] shadow-2xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl beam-border-top">
        <AlertDialogHeader className="hidden">
          <AlertDialogTitle>Assembling Masterclass</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription asChild>
          <div className="flex flex-col items-center justify-center text-center space-y-5 py-2">
            {/* Glowing Spinner */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-cyan-100 dark:border-cyan-950/80 border-t-cyan-500 dark:border-t-cyan-400 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-2xl">
                <HiOutlineSparkles className="animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Assembling Your Masterclass
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xs mx-auto leading-relaxed">
                {status ||
                  "Crafting in-depth lesson notes, runnable code snippets, and curating high-definition video tutorials."}
              </p>
            </div>

            {/* Moving Gradient Progress bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 h-full rounded-full animate-pulse w-full" />
            </div>

            <span className="text-[11px] font-mono text-cyan-700 dark:text-cyan-300 font-bold bg-cyan-500/10 dark:bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/20">
              High-Speed Curriculum Pipeline Active
            </span>
          </div>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadingDialogue;
