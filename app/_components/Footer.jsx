import React from "react";
import Link from "next/link";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          <div className="space-y-4 md:col-span-2">
            <Logo href="/" size="md" />
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Transform any prompt or topic into structured multi-chapter educational masterclasses with modular chapters, curated video playlists, and interactive notes.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational &bull; Instant Assembly Active</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/explore" className="hover:text-cyan-400 transition-colors">
                  Community Courses
                </Link>
              </li>
              <li>
                <Link href="/create-course" className="hover:text-cyan-400 transition-colors">
                  Create Course
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/upgrade" className="hover:text-cyan-400 transition-colors">
                  Pricing Plans (₹499)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Infrastructure
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-slate-400">Adaptive Curriculum Engine</li>
              <li className="text-slate-400">Curated Video Playlists</li>
              <li className="text-slate-400">High-Performance Database</li>
              <li className="text-slate-400">Cloud Media Storage</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} LearnGen Studio. Built for modern learners.</p>
          <div className="flex gap-6">
            <Link href="/explore" className="hover:text-slate-300">
              Explore
            </Link>
            <Link href="/dashboard" className="hover:text-slate-300">
              Dashboard
            </Link>
            <Link href="/dashboard/upgrade" className="hover:text-slate-300">
              Pro Plan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
