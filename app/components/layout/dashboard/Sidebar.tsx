"use client";

import { SidebarMenuItems } from "@/src/config/menu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800 text-white p-4 flex flex-col ">
      <div className="mb-8 text-center">
        <Link href="/dashboard" className="text-2xl font-bold text-white">
          ResumeBuilder
        </Link>
      </div>
      <nav>
        <ul>
          {SidebarMenuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                href={item.href}
                className={`block px-4 py-2 rounded-md hover:bg-gray-700 transition-colors ${pathname === item.href ? "bg-blue-600" : ""}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto">
        <button
          type="button"
          onClick={() => {
            signOut()
          }}
          className="w-full text-left px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}