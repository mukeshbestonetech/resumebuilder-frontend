// src/app/(dashboard)/dashboard/page.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; // Corrected import
import { useEffect } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);


export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  // Dummy data for Doughnut chart (used credit)
  const doughnutData = {
    labels: ["Used Credit", "Remaining Credit"],
    datasets: [
      {
        label: "Credit Usage",
        data: [75, 25], // Example: 75 used, 25 remaining
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  // Dummy data for Line chart (shares by month)
  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Total Shares by Month",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">
          Welcome to your Dashboard {session?.user?.name && `, ${session.user.name}`}
        </h1>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2 text-center">Credit Usage</h2>
            <div className="w-full h-64 md:h-80 flex justify-center items-center">
              <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }}/>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2 text-center">Monthly Shares</h2>
            <div className="w-full h-64 md:h-80"><Line data={lineData} options={{ maintainAspectRatio: false }}/></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
