'use client'

import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="flex flex-col lg:flex-row lg:grid lg:grid-cols-2 h-full">
        {/* Left Section - Content */}
        <div className="hidden lg:flex lg:flex-col lg:justify-center lg:px-12 lg:py-12 bg-gradient-to-b from-blue-600 to-indigo-700 text-white">
          <div className="max-w-md">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">LearnGen AI</h1>
              <div className="h-1 w-12 bg-blue-300 rounded"></div>
            </div>

            <h2 className="text-3xl font-bold mb-6">
              Generate Personalized Courses in Minutes
            </h2>

            <p className="text-blue-100 text-lg leading-relaxed mb-8">
              LearnGen AI uses artificial intelligence to create custom learning paths tailored to your goals. Whether you're a student, professional, or lifelong learner, we'll help you master new skills faster.
            </p>

            <ul className="space-y-4 text-blue-50">
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-blue-300 rounded-full mr-3 mt-0.5"></span>
                <span>AI-powered course generation</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-blue-300 rounded-full mr-3 mt-0.5"></span>
                <span>Personalized learning experience</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-blue-300 rounded-full mr-3 mt-0.5"></span>
                <span>Learn at your own pace</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section - Sign In Form */}
        <div className="flex flex-col justify-center items-center px-6 py-12 lg:py-0 lg:px-0 bg-white lg:bg-gray-50">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your LearnGen AI account</p>
            </div>

            <SignIn 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none border-0",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition",
                  socialButtonsBlockButtonText: "text-sm font-medium",
                  formFieldInput: "border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  footerActionLink: "text-blue-600 hover:text-blue-700",
                  formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2.5 transition"
                }
              }}
            />

            <p className="mt-6 text-center text-gray-600">
              Don't have an account?{' '}
              <a href="/sign-up" className="text-blue-600 font-medium hover:text-blue-700">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}