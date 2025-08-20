import RegisterForm from "@/components/RegisterForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next Blog - Sign Up",
  description: "Sign Up page with email.",
};

export default function RegisterPage() {
  return (
    <div className="my-6 flex min-h-screen items-center justify-center">
      <div className="mx-3 w-full max-w-md space-y-6 rounded-xl bg-background-300 p-6 shadow-2xl">
        <div className="text-center">
          <h2 className="text-primary-hover mt-6 text-3xl font-bold">
            Next Blog
          </h2>
          <p className="mt-2 text-sm text-sub-foreground">Create your account</p>
        </div>
        <RegisterForm />
        <p className="text-center">
          {"Already have an account?"}{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
