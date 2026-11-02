"use client";
import React from "react";
import Link from "next/link";

export default function Logo({ size = "md", href = "/", showTag = true, className = "" }) {
  const sizeClasses = {
    sm: { icon: "w-7 h-7", text: "text-base", sub: "text-[9px]" },
    md: { icon: "w-9 h-9", text: "text-lg", sub: "text-[10px]" },
    lg: { icon: "w-11 h-11", text: "text-2xl", sub: "text-xs" },
  }[size] || { icon: "w-9 h-9", text: "text-lg", sub: "text-[10px]" };

  const content = (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Industrial Geometric Beacon Glyph */}
      <div
        className={`${sizeClasses.icon} relative rounded-xl bg-gradient-to-br from-slate-900 via-slate-950 to-black p-0.5 border border-slate-700/60 dark:border-cyan-500/30 shadow-md group-hover:border-cyan-500/60 transition-all duration-300 group-hover:scale-105 shrink-0`}
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1"
        >
          {/* Outer Prism Hexagon / Cube */}
          <path
            d="M18 4L30 11V25L18 32L6 25V11L18 4Z"
            stroke="url(#cyanGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:stroke-cyan-300 transition-colors"
          />
          {/* Inner Light Beam */}
          <path
            d="M18 4V18L30 25"
            stroke="url(#cyanGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
          <path
            d="M18 18L6 25"
            stroke="url(#emeraldGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
          {/* Central Core Pulse */}
          <circle cx="18" cy="18" r="2.5" fill="#38bdf8" className="animate-pulse" />

          <defs>
            <linearGradient id="cyanGrad" x1="6" y1="4" x2="30" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="emeraldGrad" x1="18" y1="18" x2="6" y2="25" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34d399" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Wordmark & Industrial Studio Tag */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight text-slate-900 dark:text-white ${sizeClasses.text}`}>
            Learn<span className="text-cyan-600 dark:text-cyan-400">Gen</span>
          </span>
          {showTag && (
            <span
              className={`${sizeClasses.sub} font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/25 dark:border-cyan-400/30`}
            >
              STUDIO
            </span>
          )}
        </div>
        <span className="text-[10px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase hidden sm:block mt-0.5">
          Next-Gen EdTech
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
