"use client";
import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  HiOutlinePlusCircle,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/app/_components/ThemeToggle";

function DashboardHeader() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "My Courses", href: "/dashboard", icon: <HiOutlineHome /> },
    { name: "Explore", href: "/dashboard/explore", icon: <HiOutlineSquares2X2 /> },
    { name: "Upgrade", href: "/dashboard/upgrade", icon: <HiOutlineShieldCheck /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-850 shadow-2xs px-4 sm:px-8 py-3.5 transition-colors">
      <div className="flex justify-between items-center">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
            aria-label="Open navigation menu"
          >
            {mobileNavOpen ? (
              <HiOutlineXMark className="text-2xl" />
            ) : (
              <HiOutlineBars3 className="text-2xl" />
            )}
          </button>

          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              width={140}
              height={40}
              alt="Logo"
              priority
              className="md:hidden dark:brightness-125"
            />
          </Link>

          {/* Desktop Breadcrumb Navigation */}
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
            <Link href="/dashboard" className="hover:text-primary dark:hover:text-purple-400 transition-colors">
              Dashboard
            </Link>
            {pathname.includes("/explore") && (
              <>
                <span>/</span>
                <span className="text-slate-900 dark:text-slate-100 font-semibold">Explore</span>
              </>
            )}
            {pathname.includes("/upgrade") && (
              <>
                <span>/</span>
                <span className="text-slate-900 dark:text-slate-100 font-semibold">Upgrade</span>
              </>
            )}
            {pathname.includes("/create-course") && (
              <>
                <span>/</span>
                <span className="text-slate-900 dark:text-slate-100 font-semibold">Create Course</span>
              </>
            )}
          </div>
        </div>

        {/* Right: Quick actions, Theme Toggle & User Avatar */}
        <div className="flex items-center gap-3.5">
          <ThemeToggle />

          <Link href="/create-course">
            <Button
              size="sm"
              className="hidden sm:flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-xs px-4 py-2"
            >
              <HiOutlinePlusCircle className="text-base" />
              <span>Create Course</span>
            </Button>
          </Link>

          <div className="pl-2 sm:border-l border-slate-200 dark:border-slate-800">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileNavOpen && (
        <div className="md:hidden pt-4 pb-2 mt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 dark:bg-purple-950/50 text-primary dark:text-purple-300 font-semibold"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/create-course"
              onClick={() => setMobileNavOpen(false)}
              className="block"
            >
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl">
                + Create New Course
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default DashboardHeader;