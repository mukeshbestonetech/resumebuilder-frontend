"use client";

import Link from "next/link";

export default function DashboardHeader() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600">
          ResumeBuilder
        </Link>
        <div className="flex items-center">
          <Link
            href="/"
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Home
          </Link>
        </div>
      </nav>
    </header>
  );
}