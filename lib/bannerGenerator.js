/**
 * Returns a high-quality, topic-relevant banner image URL for any course
 * @param {string} topic - The course topic/title
 * @param {string} category - The course category
 * @returns {string} - Image URL
 */
export function getCourseBanner(topic = "", category = "") {
  const normalizedCategory = String(category).toLowerCase();
  const normalizedTopic = String(topic).toLowerCase();

  // Category specific curated high-res Unsplash banners
  if (
    normalizedCategory.includes("program") ||
    normalizedCategory.includes("code") ||
    normalizedCategory.includes("tech") ||
    normalizedTopic.includes("python") ||
    normalizedTopic.includes("react") ||
    normalizedTopic.includes("javascript") ||
    normalizedTopic.includes("web") ||
    normalizedTopic.includes("machine learning") ||
    normalizedTopic.includes("ai")
  ) {
    return "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&auto=format&fit=crop&q=80";
  }

  if (
    normalizedCategory.includes("health") ||
    normalizedCategory.includes("fitness") ||
    normalizedCategory.includes("yoga") ||
    normalizedTopic.includes("health") ||
    normalizedTopic.includes("meditation")
  ) {
    return "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1000&auto=format&fit=crop&q=80";
  }

  if (
    normalizedCategory.includes("creative") ||
    normalizedCategory.includes("design") ||
    normalizedCategory.includes("art") ||
    normalizedTopic.includes("ui") ||
    normalizedTopic.includes("ux") ||
    normalizedTopic.includes("figma")
  ) {
    return "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1000&auto=format&fit=crop&q=80";
  }

  return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80";
}

/**
 * Returns safe banner URL for a course object
 */
export function resolveBannerUrl(course) {
  const banner = course?.courseBanner;
  if (
    banner &&
    banner !== "/placeholder.png" &&
    banner !== "/placeholder.svg" &&
    (banner.startsWith("http://") || banner.startsWith("https://"))
  ) {
    return banner;
  }

  return getCourseBanner(
    course?.name || course?.courseOutput?.course?.name,
    course?.category
  );
}
