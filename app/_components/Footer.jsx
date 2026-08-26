import React from "react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-400 py-16 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-900">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="inline-block">
              <Image src="/logo.svg" alt="AI Course Generator" width={160} height={45} className="brightness-150" />
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Transform any prompt or topic into structured multi-chapter educational masterclasses powered by Google Gemini AI and YouTube video tutorials.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/explore" className="hover:text-white transition-colors">
                  Community Courses
                </Link>
              </li>
              <li>
                <Link href="/create-course" className="hover:text-white transition-colors">
                  Create AI Course
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/upgrade" className="hover:text-white transition-colors">
                  Pricing Plans (₹499)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Technology
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="text-gray-400">Google Gemini 3.6 Flash</li>
              <li className="text-gray-400">YouTube Data API v3</li>
              <li className="text-gray-400">Neon Serverless Postgres</li>
              <li className="text-gray-400">Cloudinary CDN Storage</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} AI Course Generator. Built for modern learners.</p>
          <div className="flex gap-6">
            <Link href="/explore" className="hover:text-gray-300">
              Explore
            </Link>
            <Link href="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <Link href="/dashboard/upgrade" className="hover:text-gray-300">
              Pro Plan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
