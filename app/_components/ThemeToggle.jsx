"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";

function ThemeToggle({ className = "" }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 ${className}`}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-cyan-400 hover:border-primary/40 dark:hover:border-cyan-500/40 transition-all duration-200 shadow-2xs cursor-pointer group ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <HiOutlineSun className="text-lg text-amber-400 transform group-hover:rotate-45 transition-transform duration-300" />
        ) : (
          <HiOutlineMoon className="text-lg text-slate-600 group-hover:scale-110 transition-transform duration-300" />
        )}
      </div>
    </button>
  );
}

export default ThemeToggle;
