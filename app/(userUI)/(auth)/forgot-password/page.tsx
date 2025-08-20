import ForgotPassForm from "@/components/ForgotPassForm";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next Blog - Forgot Password",
  description: "Forgot password via email.",
};
export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-3 w-full max-w-md space-y-6 rounded-xl bg-background-300 p-6 shadow-2xl">
        <div className="text-center">
          <h2 className="text-primary-hover mt-6 text-3xl font-bold">
            Next Blog
          </h2>
          <p className="mt-2 text-sm text-balance text-sub-foreground">
            Enter your email and we will send you an email to reset your
            password
          </p>
        </div>
        <ForgotPassForm />

        <Link
          href="/login"
          className="mx-auto flex w-fit items-center justify-center gap-x-1.5"
        >
          <ChevronLeft /> Back to Sign in
        </Link>
      </div>
    </div>
  );
}
