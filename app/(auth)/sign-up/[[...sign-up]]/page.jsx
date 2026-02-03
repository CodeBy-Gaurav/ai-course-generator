'use client'

import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="flex flex-col lg:flex-row lg:grid lg:grid-cols-2 h-full">
        {/* Left Section - Content */}
        <div className="hidden lg:flex lg:flex-col lg:justify-center lg:px-12 lg:py-12 bg-gradient-to-b from-indigo-600 to-blue-700 text-white">
          <div className="max-w-md">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">LearnGen AI</h1>
              <div className="h-1 w-12 bg-indigo-300 rounded"></div>
            </div>

            <h2 className="text-3xl font-bold mb-6">
              Start Your Learning Journey Today
            </h2>

            <p className="text-indigo-100 text-lg leading-relaxed mb-8">
              Join thousands of learners using LearnGen AI to create personalized courses and accelerate their learning. Our AI-powered platform adapts to your pace and learning style.
            </p>

            <ul className="space-y-4 text-indigo-50">
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-indigo-300 rounded-full mr-3 mt-0.5"></span>
                <span>Instant AI-Generated Courses</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-indigo-300 rounded-full mr-3 mt-0.5"></span>
                <span>Track Progress & Achievements</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-indigo-300 rounded-full mr-3 mt-0.5"></span>
                <span>Unlock Your Potential</span>
              </li>
            </ul>

            <div className="mt-12 pt-8 border-t border-indigo-500">
              <p className="text-sm text-indigo-200">
                Already have an account?{' '}
                <a href="/sign-in" className="text-white font-medium hover:text-indigo-100 underline">
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Sign Up Form */}
        <div className="flex flex-col justify-center items-center px-6 py-12 lg:py-0 lg:px-0 bg-white lg:bg-gray-50">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
              <p className="text-gray-600">Join LearnGen AI and start learning smarter</p>
            </div>

            <SignUp 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none border-0",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition",
                  socialButtonsBlockButtonText: "text-sm font-medium",
                  formFieldInput: "border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
                  footerActionLink: "text-indigo-600 hover:text-indigo-700",
                  formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg py-2.5 transition"
                }
              }}
            />

            <p className="mt-6 text-center text-gray-600 text-sm">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}