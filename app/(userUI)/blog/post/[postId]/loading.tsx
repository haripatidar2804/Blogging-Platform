import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="sr-only">Loading...</span>
        <Loader2 className="text-primary size-40 animate-spin" />
      </div>
    );
  }
  