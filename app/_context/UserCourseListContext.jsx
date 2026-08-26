"use client";
import { createContext, useState } from "react";

export const UserCourseListContext = createContext(null);

export default function UserCourseListContextProvider({ children }) {
  const [userCourseList, setUserCourseList] = useState([]);
  return (
    <UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>
      {children}
    </UserCourseListContext.Provider>
  );
}
