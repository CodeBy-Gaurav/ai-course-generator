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
        <Link href="/dashboard" className="block py-1">
          <Image src="/logo.svg" width={160} height={48} alt="Logo" priority className="dark:brightness-125" />
        </Link>
        <hr className="my-5 border-slate-100 dark:border-slate-800" />

        <ul className="space-y-1.5">
          {Menu.map((item) => {
            const isActive = path === item.path;
            return (
              <li key={item.id}>
                <Link href={item.path}>
                  <div
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary/10 dark:bg-purple-950/50 text-primary dark:text-purple-300 font-semibold shadow-2xs"
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
      <div className="p-4 border border-purple-100 dark:border-purple-900/40 rounded-2xl bg-gradient-to-br from-purple-50/70 to-indigo-50/70 dark:from-purple-950/30 dark:to-indigo-950/30 space-y-3 mb-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
            <HiOutlineSparkles className="text-primary dark:text-purple-400" />
            Credits Wallet
          </span>
          <span
            className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
              remainingCredits > 0
                ? "bg-primary/10 dark:bg-purple-900/60 text-primary dark:text-purple-300"
                : "bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400"
            }`}
          >
            {remainingCredits} Left
          </span>
        </div>

        <Progress value={progressValue} className="h-2 bg-purple-200/50 dark:bg-purple-900/40" />

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
              Upgrade for unlimited AI course creation.
            </p>
          )}
        </div>

        <Link href="/dashboard/upgrade" className="block pt-1">
          <span className="text-xs font-bold text-primary dark:text-purple-400 hover:underline flex items-center gap-1">
            Upgrade for ₹499/mo &rarr;
          </span>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;