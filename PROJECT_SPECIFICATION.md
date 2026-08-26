# AI Course Generator — Full Project Specification

> **Purpose:** This document gives an AI agent (or developer) everything needed to rebuild this project from scratch. Every feature, route, component, API, database table, and integration is described in detail.

---

## 1. PROJECT OVERVIEW

**What it is:** A full-stack web application that lets users generate complete, AI-powered educational courses on any topic. The AI creates a structured course outline, writes detailed chapter content, and automatically embeds relevant YouTube videos for each chapter.

**Core user flow:**
1. User signs up / logs in via Clerk authentication.
2. User selects a category, enters a topic, and configures course options (difficulty, duration, chapters, video preference).
3. Google Gemini AI generates a structured course layout (title, description, chapters with durations).
4. User can edit the course title, description, chapter names/descriptions, and upload a banner image.
5. User clicks "Generate Course Content" — Gemini generates detailed content for each chapter; YouTube API fetches a relevant video for each chapter.
6. The finished course is saved to a PostgreSQL database and assigned a shareable URL.
7. The course is publicly viewable (no auth required to view). An "Explore" tab shows all published courses by all users.
8. Free tier: 5 courses per user. Beyond that, users are redirected to an upgrade page.

---

## 2. TECH STACK

| Layer | Technology |
|---|---|
| Frontend Framework | Next.js 14+ (App Router, JavaScript — no TypeScript) |
| Styling | Tailwind CSS |
| UI Component Library | shadcn/ui (New York style, Neutral base color, CSS variables) |
| Icons | react-icons (Hero Icons 2 subset, e.g. `react-icons/hi2`) |
| Authentication | Clerk |
| AI Model | Google Gemini API (`@google/generative-ai`) |
| HTTP Client | Axios |
| ORM | Drizzle ORM |
| Database | PostgreSQL via Neon (serverless) |
| File Storage | Firebase Storage |
| Video Integration | YouTube Data API v3 |
| Unique IDs | `uuid` (`uuidv4`) |
| Markdown Rendering | `react-markdown` |
| YouTube Player | `react-youtube` |
| Deployment | Vercel |
| Font | Google Fonts — Outfit |

---

## 3. ENVIRONMENT VARIABLES (`.env.local`)

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<from Clerk dashboard>
CLERK_SECRET_KEY=<from Clerk dashboard>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in/[[...sign-in]]
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up/[[...sign-up]]
NEXT_PUBLIC_DB_CONNECTION_STRING=<Neon PostgreSQL connection string>
NEXT_PUBLIC_GEMINI_API_KEY=<Google AI Studio API key>
NEXT_PUBLIC_YOUTUBE_API_KEY=<Google Cloud Console YouTube API key>
NEXT_PUBLIC_FIREBASE_API_KEY=<Firebase project API key>
NEXT_PUBLIC_HOST_NAME=http://localhost:3000
```

---

## 4. PROJECT SETUP COMMANDS

```bash
# 1. Create Next.js project
npx create-next-app@latest ai-course-generator
# Options: TypeScript=No, ESLint=No, Tailwind=Yes, src dir=No, App Router=Yes, import alias=No

# 2. Open in VS Code
code ai-course-generator

# 3. Install shadcn/ui
npx shadcn-ui@latest init
# Style: New York | Base Color: Neutral | CSS Variables: Yes

# 4. Install shadcn components used in the project
npx shadcn-ui@latest add button
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add alert-dialog
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add select
npx shadcn-ui@latest add dropdown-menu

# 5. Install all npm dependencies
npm install @clerk/nextjs
npm install @google/generative-ai
npm install drizzle-orm @neondatabase/serverless
npm install drizzle-kit
npm install firebase
npm install react-icons
npm install uuid
npm install axios
npm install react-youtube
npm install react-markdown

# Run dev server
npm run dev
```

---

## 5. FOLDER & FILE STRUCTURE

```
ai-course-generator/
├── app/
│   ├── _components/
│   │   ├── Header.jsx          # Landing page header (logo + Get Started button)
│   │   └── Hero.jsx            # Landing page hero section
│   ├── _context/
│   │   ├── UserInputContext.jsx        # Stores user's course creation selections
│   │   └── UserCourseListContext.jsx   # Stores user's list of created courses (for sidebar progress)
│   ├── _shared/
│   │   └── CategoryList.jsx    # Exported array of course categories with icons and prompts
│   ├── (auth)/
│   │   ├── sign-in/
│   │   │   └── [[...sign-in]]/
│   │   │       └── page.jsx    # Clerk sign-in page with custom HyperUI layout
│   │   └── sign-up/
│   │       └── [[...sign-up]]/
│   │           └── page.jsx    # Clerk sign-up page
│   ├── course/
│   │   └── [courseId]/
│   │       ├── page.jsx        # Public course view page (no auth needed)
│   │       └── start/
│   │           ├── page.jsx    # Course learning page (video + content)
│   │           └── _components/
│   │               ├── ChapterListCard.jsx   # Individual chapter row in sidebar
│   │               └── ChapterContent.jsx    # Right panel: video + AI content
│   ├── create-course/
│   │   ├── layout.jsx          # Create course layout (wraps with Header + UserInputContext.Provider)
│   │   ├── page.jsx            # 3-step stepper page (category → topic → options → generate)
│   │   ├── _components/
│   │   │   ├── SelectCategory.jsx      # Step 1: Category grid selection
│   │   │   ├── TopicDescription.jsx    # Step 2: Topic input + description textarea
│   │   │   ├── SelectOption.jsx        # Step 3: Difficulty, duration, video toggle, chapters
│   │   │   └── LoadingDialogue.jsx     # Alert dialog with GIF loader during AI generation
│   │   └── [courseId]/
│   │       ├── page.jsx        # Course layout review + edit page
│   │       ├── finish/
│   │       │   └── page.jsx    # Finish page: shows course URL, share/copy options
│   │       └── _components/
│   │           ├── CourseBasicInfo.jsx     # Course title, description, banner image
│   │           ├── CourseDetail.jsx        # 4-column stats: level, duration, chapters, video
│   │           ├── ChapterList.jsx         # Expandable chapter list with edit option
│   │           ├── EditCourseBasicInfo.jsx # Dialog to edit course title + description
│   │           └── EditChapters.jsx        # Dialog to edit individual chapter name + about
│   ├── dashboard/
│   │   ├── layout.jsx          # Dashboard layout: Sidebar + Header + children (wraps UserCourseListContext.Provider)
│   │   ├── page.jsx            # Main dashboard page (shows AddCourse + UserCourseList)
│   │   ├── explore/
│   │   │   └── page.jsx        # Explore all public courses with pagination
│   │   ├── upgrade/
│   │   │   └── page.jsx        # Upgrade plan page (shown when 5-course limit reached)
│   │   └── _components/
│   │       ├── Sidebar.jsx         # Left nav: logo, menu items, progress bar
│   │       ├── Header.jsx          # Top bar: logo + UserButton (Clerk)
│   │       ├── AddCourse.jsx       # "Hello [user]" greeting + "+ Create AI Course" button
│   │       ├── UserCourseList.jsx  # Grid of user's course cards with skeleton loading
│   │       ├── CourseCard.jsx      # Reusable course card (image, title, chapters, level, delete)
│   │       └── DropdownOption.jsx  # Three-dot dropdown with delete option + AlertDialog confirm
│   ├── layout.jsx              # Root layout: Outfit font, ClerkProvider, GoogleOneTap
│   ├── page.jsx                # Landing page (renders Header + Hero)
│   └── globals.css             # Global styles (remove default Next.js background gradient)
├── configs/
│   ├── AiModel.jsx             # Google Gemini model setup + exported chat sessions
│   ├── db.jsx                  # Neon + Drizzle DB connection
│   ├── FirebaseConfig.js       # Firebase app init + storage export
│   ├── schema.jsx              # Drizzle schema: CourseList table + Chapters table
│   └── service.jsx             # YouTube API helper (getVideos function using Axios)
├── drizzle.config.js           # Drizzle Kit config (schema path, DB URL, dialect)
├── middleware.js               # Clerk middleware (protects /dashboard and /create-course routes)
├── next.config.js              # Image domains whitelist (Firebase + Clerk image hosts)
├── package.json                # Scripts: dev, build, db:push, db:studio
├── tailwind.config.js          # Extended primary/secondary colors (#875BF9, #E46BD0)
└── public/
    ├── logo.svg                # App logo
    ├── favicon.svg             # Favicon
    ├── placeholder.png         # Default course banner
    ├── coding.png              # Category icon: Programming
    ├── lotus.png               # Category icon: Health
    ├── creative.png            # Category icon: Creative
    └── loader.gif              # Animated GIF for loading dialogue
```

---

## 6. DATABASE SCHEMA (Drizzle ORM + PostgreSQL)

### Table: `courseList`

```javascript
// configs/schema.jsx
import { pgTable, serial, varchar, json, boolean } from "drizzle-orm/pg-core";

export const CourseList = pgTable("courseList", {
  id:              serial("id").primaryKey(),
  courseId:        varchar("courseId").notNull(),
  name:            varchar("name").notNull(),
  category:        varchar("category").notNull(),
  level:           varchar("level").notNull(),
  courseOutput:    json("courseOutput").notNull(),
  createdBy:       varchar("createdBy").notNull(),    // user email
  userName:        varchar("userName"),
  userProfileImage: varchar("userProfileImage"),
  courseBanner:    varchar("courseBanner").default("/placeholder.png"),
  publish:         boolean("publish").default(false),
  includeVideo:    varchar("includeVideo").default("Yes"),
});
```

### Table: `chapters`

```javascript
export const Chapters = pgTable("chapters", {
  id:        serial("id").primaryKey(),
  courseId:  varchar("courseId").notNull(),
  chapterId: varchar("chapterId").notNull(),   // index (0, 1, 2...)
  content:   json("content").notNull(),        // AI-generated chapter content array
  videoId:   varchar("videoId").notNull(),     // YouTube video ID
});
```

### DB Scripts in `package.json`

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "db:push": "drizzle-kit push",
  "db:studio": "drizzle-kit studio"
}
```

### Drizzle Config (`drizzle.config.js`)

```javascript
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./configs/schema.jsx",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,
  },
});
```

---

## 7. AUTHENTICATION (Clerk)

### Setup Steps
1. Create app in Clerk dashboard. Enable Email + Google sign-in providers.
2. Enable **Passkey** feature in Clerk dashboard (Email & Phone → Authentication Strategy).
3. Install: `npm install @clerk/nextjs`
4. Add env vars: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.
5. Wrap root layout with `<ClerkProvider>`.
6. Add `<GoogleOneTap />` component from `@clerk/nextjs/server` inside root layout `<html>` tag.

### Middleware (`middleware.js`)

```javascript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/create-course(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

### Root Layout (`app/layout.jsx`)

```javascript
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <GoogleOneTap />
        <body className={outfit.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

### Sign-in Page Route
- Path: `app/(auth)/sign-in/[[...sign-in]]/page.jsx`
- Uses HyperUI auth form layout wrapped around Clerk's `<SignIn />` component.
- The `(auth)` folder uses parentheses so Next.js does NOT treat it as a URL segment.

### Sign-up Page Route
- Path: `app/(auth)/sign-up/[[...sign-up]]/page.jsx`
- Uses Clerk's `<SignUp />` component.

### User Button (Dashboard Header)
```javascript
import { UserButton } from "@clerk/nextjs";
<UserButton />
```

### Getting Current User in Components
```javascript
import { useUser } from "@clerk/nextjs";
const { user } = useUser();
const email = user?.primaryEmailAddress?.emailAddress;
const fullName = user?.fullName;
const imageUrl = user?.imageUrl;
```

---

## 8. AI MODEL SETUP (Google Gemini)

### File: `configs/AiModel.jsx`

```javascript
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",  // IMPORTANT: forces JSON output
};

// For generating course layout
export const GenerateCourseLayout_AI = model.startChat({
  generationConfig,
  history: [],
});

// For generating chapter content
export const GenerateChapterContent_AI = model.startChat({
  generationConfig,
  history: [],
});
```

**Key note:** Setting `responseMimeType: "application/json"` is critical. It forces Gemini to return pure JSON, which can be parsed with `JSON.parse()` without stripping markdown code fences.

---

## 9. AI PROMPTS

### Prompt 1: Course Layout Generation

```javascript
// Used in: app/create-course/page.jsx → generateCourseLayout()

const BASIC_PROMPT = `Generate a course tutorial on the following detail with field as Course Name, 
Description, Along with Chapter Name, About, Duration:`;

const USER_INPUT_PROMPT = `Category: ${userCourseInput?.category}, 
Topic: ${userCourseInput?.topic}, 
Level: ${userCourseInput?.level}, 
Duration: ${userCourseInput?.duration}, 
NoOf Chapters: ${userCourseInput?.noOfChapter}, 
in JSON format`;

const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
```

**Expected JSON response shape:**
```json
{
  "course": {
    "name": "Python for Beginners",
    "description": "...",
    "duration": "5 hours",
    "noOfChapters": 5,
    "chapters": [
      { "name": "Introduction to Python", "about": "...", "duration": "30 min" },
      ...
    ]
  }
}
```

### Prompt 2: Chapter Content Generation

```javascript
// Used in: app/create-course/[courseId]/page.jsx → generateChapterContent()

const PROMPT = `Explain the concept in Detail on Topic: ${course?.name}, 
Chapter: ${chapter?.name}, in JSON Format with list of array with field as 
title, description in detail, Code Example(Code field in <precode> format) if applicable`;
```

**Expected JSON response shape:**
```json
{
  "content": [
    {
      "title": "What is Python?",
      "description": "Python is a high-level...",
      "code": "<precode>print('Hello World')</precode>"
    },
    ...
  ]
}
```

---

## 10. YOUTUBE API INTEGRATION

### File: `configs/service.jsx`

```javascript
import axios from "axios";

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

export const getVideos = async (query) => {
  const params = {
    part: "snippet",
    q: query,
    maxResults: 1,
    type: "video",
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  };
  const response = await axios.get(`${YOUTUBE_BASE_URL}/search`, { params });
  return response.data.items;
};
```

**Usage in chapter content generation:**
```javascript
const videoResponse = await getVideos(`${course.name}: ${chapter.name}`);
const videoId = videoResponse[0]?.id?.videoId;
```

**YouTube Player component:**
```javascript
import YouTube from "react-youtube";

const opts = {
  height: "390",
  width: "640",
  playerVars: { autoplay: 0 },
};

<YouTube videoId={content?.videoId} opts={opts} />
```

---

## 11. FIREBASE STORAGE (Course Banner Upload)

### File: `configs/FirebaseConfig.js`

```javascript
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
```

### Upload Logic (inside `CourseBasicInfo.jsx`)

```javascript
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/configs/FirebaseConfig";

const onFileSelected = async (event) => {
  const file = event.target.files[0];
  setSelectedFile(URL.createObjectURL(file));  // preview

  const fileName = Date.now() + ".jpg";
  const storageRef = ref(storage, `ai-course/${fileName}`);

  await uploadBytes(storageRef, file).then(async (snapshot) => {
    await getDownloadURL(storageRef).then(async (downloadUrl) => {
      // Save URL to DB
      await db.update(CourseList)
        .set({ courseBanner: downloadUrl })
        .where(eq(CourseList.id, course?.id));
    });
  });
};
```

**Firebase Storage Rules (set in Firebase Console → Storage → Rules):**
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.time < timestamp.date(2026, 1, 1);
    }
  }
}
```

---

## 12. CONTEXT API (Global State)

### Context 1: `UserInputContext` (`app/_context/UserInputContext.jsx`)

Stores the user's course creation selections as they move through the 3-step form.

```javascript
"use client";
import { createContext, useState } from "react";

export const UserInputContext = createContext(null);

export default function UserInputContextProvider({ children }) {
  const [userCourseInput, setUserCourseInput] = useState({});
  return (
    <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
      {children}
    </UserInputContext.Provider>
  );
}
```

**Fields stored in `userCourseInput`:**
```javascript
{
  category: "Programming",
  topic: "SQL",
  level: "Beginner",
  duration: "1 Hour",
  displayVideo: "Yes",
  noOfChapter: 5
}
```

**Usage in child components:**
```javascript
import { useContext } from "react";
import { UserInputContext } from "@/app/_context/UserInputContext";

const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

// Update a field:
setUserCourseInput(prev => ({ ...prev, category: "Programming" }));
```

### Context 2: `UserCourseListContext` (`app/_context/UserCourseListContext.jsx`)

Shares the user's course list between Dashboard page and Sidebar (for the progress bar count).

```javascript
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
```

---

## 13. ROUTING STRUCTURE

| URL Pattern | File | Description |
|---|---|---|
| `/` | `app/page.jsx` | Landing page |
| `/auth/sign-in/[[...sign-in]]` | `app/(auth)/sign-in/...` | Clerk sign-in |
| `/auth/sign-up/[[...sign-up]]` | `app/(auth)/sign-up/...` | Clerk sign-up |
| `/dashboard` | `app/dashboard/page.jsx` | User dashboard (protected) |
| `/dashboard/explore` | `app/dashboard/explore/page.jsx` | Explore all courses |
| `/dashboard/upgrade` | `app/dashboard/upgrade/page.jsx` | Upgrade plan page |
| `/create-course` | `app/create-course/page.jsx` | Course creation stepper (protected) |
| `/create-course/[courseId]` | `app/create-course/[courseId]/page.jsx` | Course layout review/edit |
| `/create-course/[courseId]/finish` | `app/create-course/[courseId]/finish/page.jsx` | Post-generation finish screen |
| `/course/[courseId]` | `app/course/[courseId]/page.jsx` | Public course info page |
| `/course/[courseId]/start` | `app/course/[courseId]/start/page.jsx` | Course learning view |

---

## 14. KEY COMPONENT DETAILS

### Sidebar (`app/dashboard/_components/Sidebar.jsx`)

- Fixed position, `w-64`, full height, visible only on `md:` and above.
- Shows logo, navigation menu items with react-icons, and a progress bar at the bottom.
- Menu items array:
  ```javascript
  const Menu = [
    { id: 1, name: "Home",    icon: <HiOutlineHome />,    path: "/dashboard" },
    { id: 2, name: "Explore", icon: <HiOutlineSquares2X2 />, path: "/dashboard/explore" },
    { id: 3, name: "Upgrade", icon: <HiOutlineShieldCheck />, path: "/dashboard/upgrade" },
    { id: 4, name: "Logout",  icon: <HiOutlinePower />,    path: "/" },
  ];
  ```
- Active menu detection: `const path = usePathname();` — compare `item.path === path`.
- Mark as `"use client"` because `usePathname` is a client-side hook.
- Progress bar: uses shadcn `<Progress>` component.
  ```javascript
  const { userCourseList } = useContext(UserCourseListContext);
  // value = (userCourseList.length / 5) * 100
  ```

### 3-Step Course Creation Stepper (`app/create-course/page.jsx`)

- State: `const [activeIndex, setActiveIndex] = useState(0);`
- Steps array:
  ```javascript
  const StepperOptions = [
    { id: 1, name: "Category",    icon: <HiOutlineSquares2X2 /> },
    { id: 2, name: "Topic & Desc", icon: <HiOutlineLightBulb /> },
    { id: 3, name: "Options",      icon: <HiOutlineClipboardDocumentCheck /> },
  ];
  ```
- Stepper coloring logic:
  ```javascript
  // Background fills when step is reached or passed
  className={`${activeIndex >= index ? "bg-primary text-white" : "bg-gray-200"} ...`}
  // Connector line between steps fills when previous step is completed
  className={`${activeIndex - 1 >= index ? "bg-purple-500" : "bg-gray-300"} ...`}
  ```
- "Next" button disabled logic (function `checkStatus()`):
  - Index 0: disabled if `userCourseInput?.category === undefined`
  - Index 1: disabled if `userCourseInput?.topic?.length === 0 || undefined`
  - Index 2: disabled if any of level / duration / displayVideo / noOfChapter is undefined
- "Generate Course Layout" button replaces "Next" only when `activeIndex === 2`.
- On generate: calls Gemini AI, saves to DB, navigates to `/create-course/[courseId]`.

### Course Basic Info (`_components/CourseBasicInfo.jsx`)

- Shows: course title (editable via dialog), description, course banner image (click to upload), and Start/Go to Course button.
- The image acts as a file upload trigger using a hidden `<input type="file" id="upload-image" className="opacity-0" />` and a `<label htmlFor="upload-image">` wrapping the `<Image>` tag.
- Accepts `edit` prop (default `true`). When `edit=false`: hides edit dialog, disables file upload, shows Start button.
- `refreshData` prop: callback that re-fetches course data from parent after edits.

### Course Layout Review Page (`app/create-course/[courseId]/page.jsx`)

**Functions:**
- `getCourse()` — fetches course by `params.courseId` AND `user.primaryEmailAddress.emailAddress` (double where clause for security).
- `generateChapterContent()` — loops through all chapters, for each:
  1. Builds AI prompt with `course.name` + `chapter.name`
  2. Awaits Gemini `sendMessage(prompt)` → parses JSON response
  3. Awaits `getVideos(course.name + ': ' + chapter.name)` → extracts `videoId`
  4. Inserts row into `Chapters` table with `courseId`, `chapterId` (index), `content`, `videoId`
  5. After all chapters done: updates `CourseList.publish = true`
  6. Navigates to `/create-course/[courseId]/finish`
- Shows `<LoadingDialogue loading={loading} />` during generation.

### Loading Dialogue (`_components/LoadingDialogue.jsx`)

Uses shadcn `<AlertDialog open={loading}>` — cannot be closed by clicking outside.

```javascript
<AlertDialog open={loading}>
  <AlertDialogContent>
    <AlertDialogDescription>
      <div className="flex flex-col items-center py-10">
        <Image src="/loader.gif" width={100} height={100} alt="loader" />
        <h2>Please wait... AI is working on your course</h2>
      </div>
    </AlertDialogDescription>
  </AlertDialogContent>
</AlertDialog>
```

### Chapter Content View (`app/course/[courseId]/start/_components/ChapterContent.jsx`)

```javascript
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";

// Video player
<YouTube videoId={content?.videoId} opts={{ height:"390", width:"640", playerVars: { autoplay:0 }}} />

// Chapter content iteration
{content?.content?.map((item, index) => (
  <div key={index} className="p-5 bg-slate-100 rounded-lg mb-3">
    <h2 className="font-medium text-lg">{item?.title}</h2>
    <ReactMarkdown>{item?.description}</ReactMarkdown>
    {item?.code && (
      <div className="bg-black text-white p-4 rounded-md mt-3">
        <pre><code>{item?.code}</code></pre>
      </div>
    )}
  </div>
))}
```

---

## 15. DATABASE OPERATIONS (Drizzle ORM Patterns)

```javascript
import { db } from "@/configs/db";
import { CourseList, Chapters } from "@/configs/schema";
import { eq, and } from "drizzle-orm";

// INSERT course
await db.insert(CourseList).values({ courseId, name, category, level, courseOutput, createdBy, userName, userProfileImage });

// SELECT all user courses
const result = await db.select().from(CourseList).where(eq(CourseList.createdBy, userEmail));

// SELECT single course by courseId
const result = await db.select().from(CourseList).where(
  and(eq(CourseList.courseId, params.courseId), eq(CourseList.createdBy, userEmail))
);

// UPDATE course output (edit title/description)
await db.update(CourseList).set({ courseOutput: updatedOutput }).where(eq(CourseList.id, course.id));

// UPDATE publish flag
await db.update(CourseList).set({ publish: true }).where(eq(CourseList.courseId, courseId));

// UPDATE course banner
await db.update(CourseList).set({ courseBanner: downloadUrl }).where(eq(CourseList.id, course.id));

// DELETE course
await db.delete(CourseList).where(eq(CourseList.id, course.id)).returning({ id: CourseList.id });

// INSERT chapter
await db.insert(Chapters).values({ courseId, chapterId: index, content, videoId });

// SELECT chapter by courseId + chapterId
const result = await db.select().from(Chapters).where(
  and(eq(Chapters.chapterId, chapterIndex), eq(Chapters.courseId, course.courseId))
);

// SELECT all courses for Explore page with pagination
const result = await db.select().from(CourseList).limit(9).offset(pageIndex * 9);
```

---

## 16. `next.config.js` (Image Domains)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "img.clerk.com",
      // add any other image hosts here
    ],
  },
};

module.exports = nextConfig;
```

---

## 17. TAILWIND COLOR CUSTOMIZATION (`tailwind.config.js`)

```javascript
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#875BF9",
        secondary: "#E46BD0",
      },
    },
  },
  plugins: [],
};
```

---

## 18. CATEGORY LIST (`app/_shared/CategoryList.jsx`)

```javascript
export default [
  { id: 1, name: "Programming", icon: "/coding.png",   prompt: "..." },
  { id: 2, name: "Health",      icon: "/lotus.png",    prompt: "..." },
  { id: 3, name: "Creative",    icon: "/creative.png", prompt: "..." },
];
```

Place category icon images (`coding.png`, `lotus.png`, `creative.png`) in the `/public` folder.

---

## 19. FREE TIER LIMIT ENFORCEMENT

In `AddCourse.jsx`, check course count before navigating to create:

```javascript
const { userCourseList } = useContext(UserCourseListContext);

const handleAddCourse = () => {
  if (userCourseList?.length >= 5) {
    router.push("/dashboard/upgrade");
  } else {
    router.push("/create-course");
  }
};
```

---

## 20. SKELETON LOADING EFFECT

Used in `UserCourseList.jsx` while data is fetching:

```javascript
{courseList?.length > 0
  ? courseList.map((course, index) => <CourseCard key={index} course={course} refreshData={getUserCourses} />)
  : [1, 2, 3, 4, 5, 6].map((_, index) => (
      <div key={index} className="w-full h-[200px] bg-slate-200 animate-pulse rounded-lg mt-5" />
    ))
}
```

---

## 21. COURSE SHAREABLE URL

Format: `${process.env.NEXT_PUBLIC_HOST_NAME}/course/${course.courseId}`

The `/course/[courseId]` route is public (not listed in Clerk middleware protected routes), so anyone with the link can view it without logging in.

---

## 22. EXPLORE PAGE PAGINATION

```javascript
const [pageIndex, setPageIndex] = useState(0);

useEffect(() => { getAllCourses(); }, [pageIndex]);

const getAllCourses = async () => {
  const result = await db.select().from(CourseList).limit(9).offset(pageIndex * 9);
  setCourseList(result);
};
```

Previous button disabled when `pageIndex === 0`. Next button always visible (hide if result count < 9 for a cleaner UX).

---

## 23. DEPLOYMENT STEPS (Vercel)

1. Push code to GitHub repository.
2. Go to vercel.com → New Project → Import GitHub repo.
3. Framework: Next.js (auto-detected).
4. In "Environment Variables" section: paste all `.env.local` key-value pairs.
5. Click Deploy.
6. After deployment: update `NEXT_PUBLIC_HOST_NAME` env var to the production Vercel domain.
7. Add the production domain to Clerk's allowed origins.
8. (Optional) Customize the Vercel subdomain in Project Settings → Domains.

---

## 24. VS CODE EXTENSIONS RECOMMENDED

- **ES7+ React/Redux/React-Native snippets** — type `rfc` to scaffold a React functional component.
- **Tailwind CSS IntelliSense** — autocomplete for Tailwind classes.

---

## 25. QUICK REFERENCE: COMPONENT PROP CONTRACTS

| Component | Props |
|---|---|
| `CourseCard` | `course` (DB row), `refreshData` (fn), `displayUser` (bool, default false) |
| `CourseBasicInfo` | `course` (DB row), `refreshData` (fn), `edit` (bool, default true) |
| `EditCourseBasicInfo` | `course` (DB row), `refreshData` (fn) |
| `EditChapters` | `course` (DB row), `index` (chapter index), `refreshData` (fn) |
| `ChapterList` | `course` (DB row), `refreshData` (fn), `edit` (bool, default true) |
| `CourseDetail` | `course` (DB row) |
| `LoadingDialogue` | `loading` (bool) |
| `ChapterListCard` | `chapter` (chapter object), `index` (int) |
| `ChapterContent` | `chapter` (chapter object), `content` (Chapters DB row) |
| `DropdownOption` | `handleDropdown` (fn — delete handler) |

---

*End of specification. This document covers all routes, components, APIs, database tables, prompts, and integrations needed to build the project from scratch.*
