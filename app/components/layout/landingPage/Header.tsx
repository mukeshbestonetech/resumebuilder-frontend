"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function LandingHeader() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600">
          ResumeBuilder
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/pricing" className="text-gray-600 hover:text-blue-600">
            Pricing
          </Link>
          <Link href="/contact-us" className="text-gray-600 hover:text-blue-600">
            Contact Us
          </Link>
        </div>
        <div className="flex items-center">
          {status === "loading" ? (
            <div className="w-24 h-9 bg-gray-200 rounded-md animate-pulse"></div>
          ) : session ? (
            <Link
              href="/dashboard"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <div className="space-x-2 md:space-x-4">
              <Link href="/signin" className="px-4 py-2 text-gray-600 hover:text-blue-600 rounded-md">
                Login
              </Link>
              <Link href="/signup" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}