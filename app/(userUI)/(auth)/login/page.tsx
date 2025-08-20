import LoginForm from "@/components/LoginForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next Blog - Sign In",
  description: "Sign In page with email and Google options.",
};
export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-3 w-full max-w-md space-y-6 rounded-xl bg-background-300 p-6 shadow-2xl">
        <div className="text-center">
          <h2 className="text-primary-hover mt-6 text-3xl font-bold">
            Next Blog
          </h2>
          <p className="mt-2 text-sm text-sub-foreground">Sign in to your account</p>
        </div>
        <LoginForm />
        <p className="text-center">
          {"Don't have an account?"}{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
