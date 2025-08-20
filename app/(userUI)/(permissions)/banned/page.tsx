import { AlertTriangle } from "lucide-react";

export default function BannedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-background-700 w-full max-w-md rounded-lg p-8 shadow-md">
        <div className="mb-6 flex justify-center">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="mb-4 text-center text-2xl font-bold text-sub-foreground">
          Account Banned
        </h1>
        <p className="mb-6 text-center">
          {
            "We're sorry, but your account has been banned. You cannot perform this action or access certain features."
          }
        </p>
      </div>
    </div>
  );
}
