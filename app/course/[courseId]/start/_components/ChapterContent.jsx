"use client";
import React, { useState } from "react";
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import {
  HiOutlineCheck,
  HiOutlineClipboardDocument,
  HiOutlinePlayCircle,
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
  HiOutlineDocumentText,
  HiOutlineAcademicCap,
  HiOutlineSparkles,
  HiOutlineArrowDownTray,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import InteractiveQuiz from "./InteractiveQuiz";

function ChapterContent({
  chapter,
  content,
  onNextLesson,
  onPrevLesson,
  hasNext,
  hasPrev,
  currentLessonIndex,
  totalLessons,
  isCompleted = false,
  onToggleComplete,
  onOpenCertificate,
}) {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("guide"); // "guide" | "quiz" | "takeaways"

  const opts = {
    height: "420",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const copyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sections = Array.isArray(content?.content)
    ? content.content
    : content?.content?.content || [];

  const rawQuiz = content?.quiz || [];
  const takeaways = Array.isArray(content?.keyTakeaways)
    ? content.keyTakeaways
    : [
        `Understand the core terminology and architecture for ${chapter?.name || "this topic"}.`,
        "Implement practical code patterns and avoid anti-patterns.",
        "Review corresponding video explanations for deeper visual context.",
      ];

  const exportNotesAsMarkdown = () => {
    let md = `# ${chapter?.name || "Lesson"}\n\n`;
    md += `> ${chapter?.about || ""}\n\n`;
    if (content?.videoId) {
      md += `**Video Tutorial:** https://www.youtube.com/watch?v=${content.videoId}\n\n`;
    }
    md += `## Lesson Notes\n\n`;
    sections.forEach((sec, idx) => {
      md += `### ${idx + 1}. ${sec.title}\n\n${sec.description}\n\n`;
      if (sec.code) {
        md += "```\n" + sec.code.replace(/<precode>/g, "").replace(/<\/precode>/g, "").trim() + "\n```\n\n";
      }
    });
    md += `## Key Takeaways\n\n`;
    takeaways.forEach((t) => {
      md += `- ${t}\n`;
    });

    const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(chapter?.name || "lesson").replace(/[^a-zA-Z0-9]/g, "_")}_notes.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8">
      {/* Header & Lesson Progress */}
      <div className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 dark:bg-cyan-950/60 border border-cyan-500/20 px-3.5 py-1 rounded-full">
              Lesson {currentLessonIndex + 1} of {totalLessons}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {chapter?.duration || "15 mins"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Export Notes Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={exportNotesAsMarkdown}
              className="text-xs rounded-xl flex items-center gap-1.5 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              <HiOutlineArrowDownTray />
              <span>Export Notes (.md)</span>
            </Button>

            {/* Mark as Completed Button */}
            {onToggleComplete && (
              <Button
                variant={isCompleted ? "default" : "outline"}
                size="sm"
                onClick={onToggleComplete}
                className={`text-xs rounded-xl flex items-center gap-1.5 transition-all ${
                  isCompleted
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500"
                    : "border-slate-200 dark:border-slate-800"
                }`}
              >
                <HiOutlineCheckCircle className="text-sm" />
                <span>{isCompleted ? "Completed" : "Mark Complete"}</span>
              </Button>
            )}
          </div>
        </div>

        <h1 className="font-extrabold text-2xl md:text-4xl text-slate-900 dark:text-white leading-tight">
          {chapter?.name}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
          {chapter?.about}
        </p>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-850">
          <button
            onClick={() => setActiveTab("guide")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "guide"
                ? "bg-cyan-500/10 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
            }`}
          >
            <HiOutlineDocumentText className="text-sm" />
            <span>Lesson Guide &amp; Video</span>
          </button>

          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "quiz"
                ? "bg-cyan-500/10 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
            }`}
          >
            <HiOutlineAcademicCap className="text-sm" />
            <span>Knowledge Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab("takeaways")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "takeaways"
                ? "bg-cyan-500/10 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 shadow-2xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
            }`}
          >
            <HiOutlineSparkles className="text-sm" />
            <span>Takeaways &amp; Checklist</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Lesson Guide & Video */}
      {activeTab === "guide" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* YouTube Video Lesson */}
          {content?.videoId ? (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <HiOutlinePlayCircle className="text-cyan-600 dark:text-cyan-400 text-xl" />
                Video Tutorial
              </h3>
              <div className="rounded-3xl overflow-hidden shadow-lg bg-black aspect-video w-full border border-slate-800">
                <YouTube
                  videoId={content?.videoId}
                  opts={opts}
                  className="w-full h-full"
                  iframeClassName="w-full h-full"
                />
              </div>
            </div>
          ) : null}

          {/* In-depth Lesson Sections */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Lesson Notes &amp; Key Concepts
            </h3>

            {sections.length > 0 ? (
              sections.map((item, index) => {
                const rawCode = item?.code
                  ? String(item.code)
                      .replace(/<precode>/g, "")
                      .replace(/<\/precode>/g, "")
                      .trim()
                  : null;

                return (
                  <div
                    key={index}
                    className="p-6 md:p-8 bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-xs space-y-4 hover:border-slate-300 dark:hover:border-slate-750 transition-colors"
                  >
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                      {item?.title}
                    </h4>

                    <div className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed prose dark:prose-invert prose-slate max-w-none">
                      <ReactMarkdown>{item?.description}</ReactMarkdown>
                    </div>

                    {rawCode && (
                      <div className="mt-5 rounded-2xl bg-slate-950 text-slate-100 overflow-hidden border border-slate-800 shadow-xl beam-border-top">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400 font-mono">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            </div>
                            <span className="text-[11px] text-slate-400">interactive-example</span>
                          </div>
                          <button
                            onClick={() => copyCode(rawCode, index)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-[11px]"
                          >
                            {copiedIndex === index ? (
                              <>
                                <HiOutlineCheck className="text-emerald-400" />
                                <span className="text-emerald-400 font-semibold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <HiOutlineClipboardDocument />
                                <span>Copy Code</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed text-slate-200">
                          <code>{rawCode}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl">
                Detailed lesson content is loading...
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Knowledge Check Quiz */}
      {activeTab === "quiz" && (
        <div className="animate-in fade-in duration-200">
          <InteractiveQuiz quiz={rawQuiz} chapterName={chapter?.name} />
        </div>
      )}

      {/* TAB 3: Takeaways & Checklist */}
      {activeTab === "takeaways" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6 animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              Summary &bull; {chapter?.name}
            </span>
            <h3 className="font-extrabold text-xl text-slate-900 dark:text-white mt-2">
              Key Lesson Takeaways
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Review and retain these foundational principles before moving to the next chapter.
            </p>
          </div>

          <div className="space-y-3">
            {takeaways.map((point, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  ✓
                </div>
                <span className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Footer between Lessons */}
      <div className="flex items-center justify-between pt-8 border-t border-slate-200 dark:border-slate-800">
        <Button
          variant="outline"
          disabled={!hasPrev}
          onClick={onPrevLesson}
          className="flex items-center gap-2 px-6 rounded-xl dark:border-slate-800 dark:hover:bg-slate-900"
        >
          <HiOutlineArrowLeft />
          Previous Lesson
        </Button>

        {hasNext ? (
          <Button
            onClick={onNextLesson}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 rounded-xl font-semibold shadow-sm cursor-pointer"
          >
            Next Lesson
            <HiOutlineArrowRight />
          </Button>
        ) : (
          <Button
            onClick={onOpenCertificate}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 rounded-xl font-bold shadow-md cursor-pointer"
          >
            <span>🎉 View Certificate of Mastery</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export default ChapterContent;
