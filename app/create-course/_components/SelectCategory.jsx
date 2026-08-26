import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import React, { useContext } from "react";
import { userInputContext } from "@/app/_context/UserInputContext";
import { HiCheckCircle } from "react-icons/hi2";

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(userInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Select Course Category
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Choose the general category that best matches the topic you want to learn.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {CategoryList.map((item) => {
          const isSelected = userCourseInput?.category === item.name;
          return (
            <div
              key={item.id}
              onClick={() => handleCategoryChange(item.name)}
              className={`relative flex flex-col items-center justify-center p-8 rounded-3xl border-2 cursor-pointer transition-all duration-200 group bg-white dark:bg-slate-900 ${
                isSelected
                  ? "border-primary dark:border-purple-500 bg-primary/5 dark:bg-purple-950/40 shadow-md scale-[1.02]"
                  : "border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-purple-500/50 hover:bg-slate-50 dark:hover:bg-slate-850 hover:shadow-xs"
              }`}
            >
              {isSelected && (
                <HiCheckCircle className="absolute top-4 right-4 text-primary dark:text-purple-400 text-2xl" />
              )}
              <div className="w-20 h-20 relative mb-4 transition-transform group-hover:scale-110">
                <Image
                  src={item.icon}
                  fill
                  alt={item.name}
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-purple-400 transition-colors">
                {item.name}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SelectCategory;