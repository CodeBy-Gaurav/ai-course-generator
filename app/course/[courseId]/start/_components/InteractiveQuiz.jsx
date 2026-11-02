"use client";
import React, { useState } from "react";
import {
  HiOutlineAcademicCap,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineLightBulb,
  HiOutlineArrowPath,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";

export default function InteractiveQuiz({ quiz = [], chapterName = "Lesson" }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});

  // Fallback quiz if legacy content didn't generate quiz questions
  const activeQuiz =
    Array.isArray(quiz) && quiz.length > 0
      ? quiz
      : [
          {
            question: `What is the primary pedagogical goal covered in "${chapterName}"?`,
            options: [
              "Memorizing passive syntax without hands-on application",
              "Understanding core principles and applying real-world patterns",
              "Deleting all production configuration files",
              "Ignoring performance bottlenecks and security checks",
            ],
            correctIndex: 1,
            explanation:
              "Practical application and foundational conceptual understanding are the key drivers of long-term mastery.",
          },
          {
            question: "How should you verify the practical exercises in this lesson?",
            options: [
              "By running the code, testing edge cases, and checking the video walkthrough",
              "By skipping the examples directly to the final chapter",
              "By disabling all TypeScript and linting rules",
              "By running unverified scripts in production without review",
            ],
            correctIndex: 0,
            explanation:
              "Active verification through code execution and paired tutorials builds reliable mental models.",
          },
        ];

  const handleSelect = (qIdx, optIdx) => {
    if (submitted[qIdx]) return; // locked once answered
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
    setSubmitted((prev) => ({ ...prev, [qIdx]: true }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted({});
  };

  const totalQuestions = activeQuiz.length;
  const answeredCount = Object.keys(submitted).length;
  const correctCount = Object.entries(selectedAnswers).filter(
    ([qIdx, optIdx]) => activeQuiz[Number(qIdx)]?.correctIndex === optIdx
  ).length;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
      {/* Quiz Header & Score Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 text-xs font-bold uppercase tracking-wider mb-2">
            <HiOutlineAcademicCap className="text-sm" />
            Knowledge Check
          </div>
          <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">
            Lesson Quiz: Test Your Understanding
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Select the best answer for each question. Immediate feedback will be displayed.
          </p>
        </div>

        {answeredCount > 0 && (
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800">
              Score: <span className="text-cyan-600 dark:text-cyan-400">{correctCount}</span> / {totalQuestions}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="text-xs rounded-xl flex items-center gap-1"
            >
              <HiOutlineArrowPath />
              Reset
            </Button>
          </div>
        )}
      </div>

      {/* Questions Stack */}
      <div className="space-y-6">
        {activeQuiz.map((item, qIdx) => {
          const isAnswered = submitted[qIdx];
          const chosenOpt = selectedAnswers[qIdx];
          const isCorrect = isAnswered && chosenOpt === item.correctIndex;

          return (
            <div
              key={qIdx}
              className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Question {qIdx + 1} of {totalQuestions}
                </span>
                {isAnswered && (
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isCorrect
                        ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                        : "bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-500/30"
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <HiOutlineCheckCircle /> Correct
                      </>
                    ) : (
                      <>
                        <HiOutlineXCircle /> Incorrect
                      </>
                    )}
                  </span>
                )}
              </div>

              <h4 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                {item.question}
              </h4>

              {/* Options */}
              <div className="space-y-2">
                {item.options.map((opt, optIdx) => {
                  const wasChosen = chosenOpt === optIdx;
                  const isRightAnswer = optIdx === item.correctIndex;

                  let optionStyle =
                    "border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200";

                  if (isAnswered) {
                    if (isRightAnswer) {
                      optionStyle =
                        "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500/40";
                    } else if (wasChosen && !isRightAnswer) {
                      optionStyle =
                        "border-red-500 bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-200 line-through opacity-80";
                    } else {
                      optionStyle =
                        "border-slate-200 dark:border-slate-850 opacity-60 bg-white dark:bg-slate-900";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-mono font-bold text-xs shrink-0 text-slate-500">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isAnswered && isRightAnswer && (
                        <HiOutlineCheckCircle className="text-emerald-500 text-lg shrink-0" />
                      )}
                      {isAnswered && wasChosen && !isRightAnswer && (
                        <HiOutlineXCircle className="text-red-500 text-lg shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Reveal */}
              {isAnswered && (
                <div className="p-3.5 rounded-xl bg-cyan-500/5 dark:bg-cyan-950/30 border border-cyan-500/20 text-xs leading-relaxed text-slate-700 dark:text-slate-300 flex items-start gap-2.5 animate-in fade-in duration-200">
                  <HiOutlineLightBulb className="text-cyan-600 dark:text-cyan-400 text-base shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-cyan-700 dark:text-cyan-300">Explanation: </span>
                    <span>{item.explanation}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
