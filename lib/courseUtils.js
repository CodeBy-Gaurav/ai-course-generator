/**
 * Normalizes courseOutput into a consistent schema regardless of AI response format
 * @param {Object} course - The DB course row
 * @returns {Object} { name, description, category, level, duration, chapters: [{ name, about, duration }] }
 */
export function normalizeCourse(course) {
  if (!course) return null;

  const raw = course?.courseOutput || {};
  const inner = raw?.course || raw;

  const name =
    inner?.name ||
    inner?.courseName ||
    inner?.title ||
    course?.name ||
    "AI Course";

  const description =
    inner?.description ||
    inner?.about ||
    inner?.summary ||
    raw?.description ||
    raw?.about ||
    "A comprehensive AI-generated masterclass covering practical skills, real-world examples, and step-by-step guidance.";

  const category =
    course?.category ||
    inner?.category ||
    raw?.category ||
    "Programming";

  const level =
    course?.level ||
    inner?.level ||
    inner?.difficulty ||
    raw?.level ||
    "Beginner";

  const duration =
    inner?.duration ||
    raw?.duration ||
    "1-2 Hours";

  // Normalize chapters / modules
  const rawChapters =
    inner?.chapters ||
    raw?.chapters ||
    inner?.modules ||
    raw?.modules ||
    [];

  const chapters = Array.isArray(rawChapters)
    ? rawChapters.map((ch, idx) => ({
        name:
          ch?.name ||
          ch?.chapterName ||
          ch?.title ||
          `Chapter ${idx + 1}`,
        about:
          ch?.about ||
          ch?.description ||
          ch?.summary ||
          `Learn the essential concepts and best practices for Chapter ${idx + 1}.`,
        duration:
          ch?.duration ||
          ch?.time ||
          "20 mins",
      }))
    : [];

  return {
    name,
    description,
    category,
    level,
    duration,
    chapters,
    noOfChapters: chapters.length,
  };
}
