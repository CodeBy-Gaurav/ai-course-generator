"use client";
import React from "react";
import Sidebar from "./_components/SideBar";
import Header from "./_components/Header";
import UserCourseListContextProvider from "@/app/_context/UserCourseListContext";

function DashboardLayout({ children }) {
  return (
    <UserCourseListContextProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
        <div className="md:w-64 hidden md:block">
          <Sidebar />
        </div>
        <div className="md:ml-64">
          <Header />
          <div className="p-6 md:p-10">{children}</div>
        </div>
      </div>
    </UserCourseListContextProvider>
  );
}

export default DashboardLayout;