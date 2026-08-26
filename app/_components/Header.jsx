"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import {
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlinePlusCircle,
} from "react-icons/hi2";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Courses", href: "/explore" },
    { name: "Pricing", href: "/dashboard/upgrade" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-850 shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.svg"
              alt="AI Course Generator"
              width={160}
              height={45}
              priority
              className="transition-transform group-hover:scale-105 dark:brightness-125"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary dark:text-purple-400 font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-purple-400"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth Controls & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3.5">
            <ThemeToggle />

            <SignedOut>
              <Link href="/sign-in">
                <Button variant="ghost" className="text-slate-700 dark:text-slate-200 font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 rounded-xl shadow-xs">
                  Get Started Free &rarr;
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <Link href="/create-course">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5 text-primary dark:text-purple-300 border-primary/30 dark:border-purple-500/30 hover:bg-primary/5 dark:hover:bg-purple-950/40 rounded-xl font-medium"
                >
                  <HiOutlinePlusCircle className="text-base" />
                  Create Course
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-primary hover:bg-primary/90 text-white font-medium rounded-xl shadow-xs">
                  Dashboard
                </Button>
              </Link>
              <div className="pl-2 border-l border-slate-200 dark:border-slate-800">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>

          {/* Mobile Hamburger & Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <HiOutlineXMark className="text-2xl" />
              ) : (
                <HiOutlineBars3 className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <SignedOut>
              <Link
                href="/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full"
              >
                <Button variant="outline" className="w-full rounded-xl">
                  Sign In
                </Button>
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full"
              >
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl">
                  Get Started Free
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                href="/create-course"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full"
              >
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl mb-2">
                  + Create New Course
                </Button>
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full"
              >
                <Button variant="outline" className="w-full rounded-xl">
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;