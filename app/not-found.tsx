import { LucideOctagonAlert } from "lucide-react";
import Link from "next/link";
import UserLayout from "./(userUI)/layout";

export default function NotFound() {
  return (
    <UserLayout>
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-background-700 w-full max-w-md rounded-lg p-8 shadow-md">
        <div className="mb-6 flex justify-center">
          <LucideOctagonAlert className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="mb-4 text-center text-2xl font-bold text-sub-foreground">
          Page Not Found
        </h1>
        <p className="mb-6 text-center">
          {"Oops. The page you requested doesn't exists."}
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="rounded-lg bg-sky-600 p-3 text-white shadow hover:bg-sky-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
    </UserLayout>
  );
}
