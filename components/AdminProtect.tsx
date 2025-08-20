"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { AlertTriangle, Loader2 } from "lucide-react";
import { ReactNode } from "react";

export default function AdminProtect({ children }: { children: ReactNode }) {
  const { isLoading, user } = useUserInfo();
  return (
    <>
      {isLoading ? (
        <>
          <span className="sr-only"></span>
          <Loader2 className="text-primary mx-auto mt-50 size-60 animate-spin" />
        </>
      ) : (
        <>
          {user?.role === "admin" ? (<>
            { children }
            </>
          ) : (
            <>
              <div className="flex min-h-screen items-center justify-center">
                <div className="bg-background-700 w-full max-w-md rounded-lg p-8 shadow-md">
                  <div className="mb-6 flex justify-center">
                    <AlertTriangle className="h-16 w-16 text-red-500" />
                  </div>
                  <h1 className="mb-4 text-center text-2xl font-bold text-sub-foreground">
                    Unauthorized Access
                  </h1>
                  <p className="mb-6 text-center">
                    {
                      "You don't have permission to access this page. Only admins are allowed!"
                    }
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
