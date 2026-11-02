"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import {
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineShieldCheck,
  HiOutlinePower,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { Progress } from "@/components/ui/progress";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { useClerk } from "@clerk/nextjs";
import Logo from "@/app/_components/Logo";

function Sidebar() {
  const { userCourseList } = useContext(UserCourseListContext);
  const { signOut } = useClerk();
  const path = usePathname();

  const Menu = [
    {
      id: 1,
      name: "My Courses",
      icon: <HiOutlineHome size={22} />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore Community",
      icon: <HiOutlineSquares2X2 size={22} />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "Upgrade Plan",
      icon: <HiOutlineShieldCheck size={22} />,
      path: "/dashboard/upgrade",
    },
  ];

  const totalCredits = 5;
  const usedCredits = userCourseList?.length || 0;
  const remainingCredits = Math.max(0, totalCredits - usedCredits);
  const progressValue = Math.min((usedCredits / totalCredits) * 100, 100);

  return (
    <aside className="fixed h-full md:w-64 p-5 shadow-2xs border-r border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-950 flex flex-col justify-between select-none transition-colors">
      <div>
        <div className="py-1">
          <Logo href="/dashboard" size="md" />
        </div>
        <hr className="my-5 border-slate-100 dark:border-slate-850" />

        <ul className="space-y-1.5">
          {Menu.map((item) => {
            const isActive = path === item.path;
            return (
              <li key={item.id}>
                <Link href={item.path}>
                  <div
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-cyan-500/10 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400 font-semibold border border-cyan-500/20 shadow-2xs"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <div className="text-xl">{item.icon}</div>
                    <h2>{item.name}</h2>
                  </div>
                </Link>
              </li>
            );
          })}

          <li>
            <button
              onClick={() => signOut({ redirectUrl: "/" })}
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 transition-all text-left cursor-pointer"
            >
              <div className="text-xl">
                <HiOutlinePower size={22} />
              </div>
              <h2>Logout</h2>
            </button>
          </li>
        </ul>
      </div>

      {/* Credit Wallet Widget */}
      <div className="p-4 border border-slate-200 dark:border-white/[0.08] rounded-2xl bg-slate-50 dark:bg-zinc-900/80 space-y-3 mb-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
            <HiOutlineSparkles className="text-cyan-600 dark:text-cyan-400" />
            Course Credits
          </span>
          <span
            className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
              remainingCredits > 0
                ? "bg-cyan-500/10 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20"
                : "bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400"
            }`}
          >
            {remainingCredits} Left
          </span>
        </div>

        <Progress value={progressValue} className="h-2 bg-slate-200 dark:bg-zinc-800" />

        <div className="space-y-1">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            {usedCredits} of {totalCredits} free courses created
          </p>
          {remainingCredits === 0 ? (
            <p className="text-[11px] text-red-600 dark:text-red-400 font-semibold">
              Free quota reached! Upgrade for unlimited.
            </p>
          ) : (
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Upgrade for unlimited masterclass creation.
            </p>
          )}
        </div>

        <Link href="/dashboard/upgrade" className="block pt-1">
          <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1">
            Upgrade for ₹499/mo &rarr;
          </span>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;