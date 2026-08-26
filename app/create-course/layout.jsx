"use client";
import React, { useState } from "react";
import Header from "../dashboard/_components/Header";
import { userInputContext } from "../_context/UserInputContext";

function CreateCourseLayout({ children }) {
  const [userCourseInput, setUserCourseInput] = useState({
    category: "Programming",
    topic: "",
    description: "",
    difficulty: "beginner",
    duration: "1 Hour",
    video: "yes",
    chapters: 4,
  });

  return (
    <div>
      <userInputContext.Provider
        value={{ userCourseInput, setUserCourseInput }}
      >
        <Header />
        {children}
      </userInputContext.Provider>
    </div>
  );
}

export default CreateCourseLayout;