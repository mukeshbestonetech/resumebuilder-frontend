// src/app/(dashboard)/dashboard/page.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
        <p>You are signed in as {session.user?.email}</p>
        <button onClick={() => signOut()} className="px-4 py-2 mt-4 text-white bg-red-500 rounded-md">
          Sign Out
        </button>
      </div>
    );
  }

  return null;
}
