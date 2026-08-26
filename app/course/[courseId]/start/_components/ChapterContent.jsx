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
} from "react-icons/hi2";

function ChapterContent({
  chapter,
  content,
  onNextLesson,
  onPrevLesson,
  hasNext,
  hasPrev,
  currentLessonIndex,
  totalLessons,
}) {
  const [copiedIndex, setCopiedIndex] = useState(null);

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

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-10">
      {/* Header & Lesson Progress */}
      <div className="space-y-3 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-purple-300 bg-primary/10 dark:bg-purple-950/60 px-3.5 py-1 rounded-full">
            Lesson {currentLessonIndex + 1} of {totalLessons}
          </span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {chapter?.duration || "15 mins"}
          </span>
        </div>
        <h1 className="font-extrabold text-2xl md:text-4xl text-slate-900 dark:text-white leading-tight">
          {chapter?.name}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
          {chapter?.about}
        </p>
      </div>

      {/* YouTube Video Lesson */}
      {content?.videoId ? (
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <HiOutlinePlayCircle className="text-primary dark:text-purple-400 text-xl" />
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
                  <div className="mt-4 rounded-2xl bg-slate-950 text-slate-100 overflow-hidden border border-slate-800">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
                      <span>Code Example</span>
                      <button
                        onClick={() => copyCode(rawCode, index)}
                        className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedIndex === index ? (
                          <>
                            <HiOutlineCheck className="text-green-400" />
                            <span className="text-green-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <HiOutlineClipboardDocument />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-xs md:text-sm font-mono overflow-x-auto leading-relaxed">
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
          <div className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/60 px-4 py-2 rounded-xl border border-green-200 dark:border-green-800">
            🎉 Course Completed!
          </div>
        )}
      </div>
    </div>
  );
}

export default ChapterContent;
