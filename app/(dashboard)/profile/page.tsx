"use client";

import { getUserDetails } from "@/src/actions/user.action";
import { IUser } from "@/src/types/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<IUser | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(() => {
    // Fetch user details when the component mounts and the session is available
    if (session) {
      fetchUserDetails();
    }
  }, [session]);

  const fetchUserDetails = async () => {
   const user = await getUserDetails();
   setUserDetails(user?.data || null);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h1>
        {userDetails ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> {userDetails.email}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Plan:</strong> {userDetails.plan} ({userDetails.resumeLimit} Resumes)
            </p>
          </div>
        ) : (
          <div>Loading user details...</div>
        )}
      </div>
    );
  }

  return null;
}