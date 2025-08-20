"use client";

import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
} from "recharts";
import { getAllUsers } from "../actions/admin";
import { getAllPosts } from "../actions/posts";
import { DocumentData } from "firebase/firestore";
import { Loader2 } from "lucide-react";

type dataAnalyticsType = { month: string; count: number };

export default function DashboardAnalytics() {
  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState<dataAnalyticsType[]>([]);
  const [postsData, setPostsData] = useState<dataAnalyticsType[]>([]);
  const [total, setTotal] = useState({ users: 0, posts: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, posts] = await Promise.all([
          getAllUsers(),
          getAllPosts(),
        ]);

        setTotal({
          users: users.length,
          posts: posts.length,
        });

        setUsersData(processData(users, "joinedAt"));
        setPostsData(processData(posts, "createdAt"));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const processData = (data: DocumentData[], dateField: string) => {
    const grouped: { [key: string]: number } = {};

    data.forEach((item) => {
      const date = new Date(item[dateField]);
      const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      grouped[monthYear] = (grouped[monthYear] || 0) + 1;
    });

    const now = new Date();
    const monthsRange: dataAnalyticsType[] = [];

    for (let i = -9; i <= 1; i++) {
      const tempDate = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const monthYear = `${tempDate.getFullYear()}-${(tempDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      monthsRange.push({
        month: monthYear,
        count: grouped[monthYear] || 0,
      });
    }
    return monthsRange;
  };

  const getCurrentMonthUsers = () => {
    const date = new Date();
    const thisMonthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
    return usersData.filter((entry) => thisMonthYear === entry.month)[0].count;
  };

  return (
    <div className="mx-auto mb-10 max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
      <h1 className="mt-10 text-center text-2xl font-semibold">
        Analytics Dashboard
      </h1>
      {isLoading ? (
        <>
          <span className="sr-only"></span>
          <Loader2 className="text-primary mx-auto mt-20 size-40 animate-spin" />
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-background-800 rounded-lg p-6 shadow-md">
              <h2 className="text-lg font-medium">Total Posts</h2>
              <p className="mt-2 text-3xl font-semibold text-sky-600">
                {total.posts}
              </p>
            </div>
            <div className="bg-background-800 rounded-lg p-6 shadow-md">
              <h2 className="text-lg font-medium">Total Users</h2>
              <p className="mt-2 text-3xl font-semibold text-sky-600">
                {total.users}
              </p>
            </div>
            <div className="bg-background-800 rounded-lg p-6 shadow-md">
              <h2 className="text-lg font-medium">New Users (This Month)</h2>
              <p className="mt-2 text-3xl font-semibold text-sky-600">
                {getCurrentMonthUsers()}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="bg-background-800 rounded-lg p-4 shadow-md">
              <h3 className="mb-2 text-lg font-semibold">
                User Signups Over Time
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={usersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--background-700)",
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="var(--primary-hover)"
                    activeBar={
                      <Rectangle
                        fill="var(--primary)"
                        stroke="var(--foreground)"
                      />
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-background-800 rounded-lg p-4 shadow-md">
              <h3 className="mb-2 text-lg font-semibold">
                Posts Created Over Time
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={postsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--background-700)",
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="var(--primary-hover)"
                    activeBar={
                      <Rectangle
                        fill="var(--primary)"
                        stroke="var(--foreground)"
                      />
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
