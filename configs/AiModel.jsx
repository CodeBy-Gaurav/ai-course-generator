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

  const prompt = `You are a world-class curriculum architect for an elite EdTech platform. Design a masterclass tutorial course on the topic: "${topic}".
Details:
- Category: ${category}
- Skill Level: ${level}
- Total Duration: ${duration}
- Number of Chapters: ${chaptersCount}

You MUST return a JSON object with this exact structure:
{
  "course": {
    "name": "${topic}",
    "description": "Engaging 2-3 sentence overview explaining what students will learn and achieve.",
    "category": "${category}",
    "level": "${level}",
    "duration": "${duration}",
    "noOfChapters": ${chaptersCount},
    "learningObjectives": [
      "Master core concepts and real-world patterns in ${topic}",
      "Implement practical solutions and avoid common architectural pitfalls",
      "Apply production best practices with measurable performance results"
    ],
    "targetAudience": "Ideal audience description for this course.",
    "prerequisites": "Prerequisites or recommended prior knowledge.",
    "chapters": [
      {
        "name": "Chapter 1 Title",
        "about": "Detailed summary of what is taught in this chapter.",
        "duration": "25 mins",
        "keyTopics": ["Topic 1", "Topic 2", "Topic 3"]
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
      learningObjectives: normalized.learningObjectives,
      targetAudience: normalized.targetAudience,
      prerequisites: normalized.prerequisites,
      chapters: normalized.chapters,
    },
  };
}

/**
 * Generates detailed chapter content (explanation + code examples + interactive quiz + takeaways)
 */
export async function GenerateChapterContent(courseName, chapterName) {
  const prompt = `You are an expert instructor. Explain the concept in detail for:
Course: "${courseName}"
Chapter Lesson: "${chapterName}"

Return JSON format with "content" array, "keyTakeaways" array, and "quiz" array:
{
  "content": [
    {
      "title": "Section Title",
      "description": "Comprehensive markdown explanation with bullet points and clear concepts.",
      "code": "<precode>// Practical code or command example if applicable, or leave empty</precode>"
    }
  ],
  "keyTakeaways": [
    "Key takeaway point 1",
    "Key takeaway point 2",
    "Key takeaway point 3"
  ],
  "quiz": [
    {
      "question": "Clear multiple choice question testing understanding of ${chapterName}?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 1,
      "explanation": "Clear explanation of why this option is correct."
    },
    {
      "question": "Second multiple choice question on practical application?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Clear explanation of why this option is correct."
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