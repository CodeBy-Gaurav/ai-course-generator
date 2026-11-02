"use client";
import React, { useId } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  HiOutlineCheckBadge,
  HiOutlinePrinter,
  HiOutlineXMark,
  HiOutlineShare,
} from "react-icons/hi2";

export default function CertificateModal({
  open,
  onClose,
  courseTitle = "Masterclass",
  userName = "Distinguished Learner",
  courseCategory = "Engineering",
}) {
  const credentialId = `LGN-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const issueDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Completed ${courseTitle} on LearnGen`,
        text: `I just completed the ${courseTitle} masterclass on LearnGen Studio! Check out my certificate credential: ${credentialId}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(
        `I just completed ${courseTitle} on LearnGen Studio! Credential: ${credentialId} • ${window.location.href}`
      );
      alert("Certificate link copied to clipboard!");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-2xl p-0 overflow-hidden rounded-3xl border-2 border-cyan-500/40 dark:border-cyan-500/30 bg-white dark:bg-slate-950 shadow-2xl">
        <AlertDialogHeader className="hidden">
          <AlertDialogTitle>Course Completion Certificate</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription asChild>
          <div>
            {/* Certificate Canvas */}
            <div className="p-8 sm:p-12 text-center space-y-6 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-zinc-950 dark:to-slate-950 text-slate-900 dark:text-white print:p-10">
              {/* Decorative Corner Borders */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-500 pointer-events-none" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-500 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-500 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-500 pointer-events-none" />

              {/* Close Button (Hidden when printing) */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors print:hidden"
                aria-label="Close"
              >
                <HiOutlineXMark className="text-xl" />
              </button>

              {/* Top Seal */}
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 flex items-center justify-center shadow-md">
                  <HiOutlineCheckBadge className="text-3xl" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mt-2">
                  Official Credential of Completion
                </span>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                  Certificate of Mastery
                </h2>
              </div>

              {/* Recipient Details */}
              <div className="space-y-1 pt-2">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  This certifies that
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-cyan-700 dark:text-cyan-300 underline decoration-cyan-500/30 underline-offset-8">
                  {userName}
                </h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 pt-3 max-w-md mx-auto leading-relaxed">
                  has successfully demonstrated understanding and mastered all curriculum modules for:
                </p>
              </div>

              {/* Course Title Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-lg mx-auto">
                <h4 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">
                  {courseTitle}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Category: {courseCategory} &bull; Self-Paced AI Masterclass
                </p>
              </div>

              {/* Footer Verification Row */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
                <div className="text-left">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Date Issued</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{issueDate}</span>
                </div>

                <div className="text-center">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Credential ID</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">{credentialId}</span>
                </div>

                <div className="text-right">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Issued by</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">LearnGen Studio</span>
                </div>
              </div>
            </div>

            {/* Print / Action Buttons Bar */}
            <div className="p-4 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3 print:hidden">
              <Button
                variant="outline"
                onClick={handleShare}
                className="text-xs rounded-xl flex items-center gap-1.5"
              >
                <HiOutlineShare />
                Share
              </Button>
              <Button
                onClick={handlePrint}
                className="bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <HiOutlinePrinter />
                Print / Save PDF
              </Button>
            </div>
          </div>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
}
