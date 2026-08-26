import { GoogleGenAI } from "@google/genai";
import { normalizeCourse } from "@/lib/courseUtils";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

/**
 * Generates a structured course outline with chapters
 */
export async function GenerateCourseLayout(userCourseInput, customPrompt = null) {
  const category = userCourseInput?.category || "Programming";
  const topic = userCourseInput?.topic || "General";
  const level = userCourseInput?.difficulty || userCourseInput?.level || "Beginner";
  const duration = userCourseInput?.duration || "2 Hours";
  const chaptersCount = userCourseInput?.chapters || userCourseInput?.noOfChapter || 4;

  const prompt = `You are an expert curriculum designer. Generate a complete, high-quality course tutorial on the topic: "${topic}".
Details:
- Category: ${category}
- Skill Level: ${level}
- Total Duration: ${duration}
- Number of Chapters: ${chaptersCount}

You MUST return a JSON object with this exact structure:
{
  "course": {
    "name": "${topic}",
    "description": "Write an engaging 2-3 sentence overview explaining what students will learn and achieve in this course.",
    "category": "${category}",
    "level": "${level}",
    "duration": "${duration}",
    "noOfChapters": ${chaptersCount},
    "chapters": [
      {
        "name": "Chapter 1 Title",
        "about": "Detailed summary of what is taught in this chapter.",
        "duration": "25 mins"
      }
    ]
  }
}`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    config: {
      responseMimeType: "application/json",
    },
  });

  const parsed = JSON.parse(response.text);

  // Normalize and wrap guaranteed structure
  const normalized = normalizeCourse({ courseOutput: parsed });

  return {
    course: {
      name: normalized.name,
      description: normalized.description,
      category: normalized.category,
      level: normalized.level,
      duration: normalized.duration,
      noOfChapters: normalized.noOfChapters,
      chapters: normalized.chapters,
    },
  };
}

/**
 * Generates detailed chapter content (explanation + code examples)
 */
export async function GenerateChapterContent(courseName, chapterName) {
  const prompt = `You are an expert instructor. Explain the concept in detail for:
Course: "${courseName}"
Chapter Lesson: "${chapterName}"

Return JSON format with a "content" array containing 2 to 4 detailed sections:
{
  "content": [
    {
      "title": "Section Title",
      "description": "Comprehensive markdown explanation with bullet points and clear concepts.",
      "code": "<precode>// Practical code example if applicable</precode>"
    }
  ]
}`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    config: {
      responseMimeType: "application/json",
    },
  });

  const rawText = response.text;
  return JSON.parse(rawText);
}