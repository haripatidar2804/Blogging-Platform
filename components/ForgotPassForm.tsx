"use client";

import { Input } from "./Input";
import { useActionState, useEffect } from "react";
import { forgotPassword } from "@/app/actions/user";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

export default function ForgotPassForm() {
  const [state, formAction, pending] = useActionState(
    forgotPassword,
    undefined
  );
  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);
    }
    if(state?.error) toast.error(state.error)
  }, [state]);
  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email..."
          required
        />
        {state?.errors && <p className="text-red-600">{state.errors}</p>}
      </div>
      <button
        disabled={pending}
        type="submit"
        className="flex h-9 w-full cursor-pointer items-center justify-center gap-x-1.5 rounded-lg bg-primary px-4 py-2 text-white shadow hover:bg-primary-hover disabled:bg-gray-600"
      >
        {pending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
        Reset Password
      </button>
    </form>
  );
}
