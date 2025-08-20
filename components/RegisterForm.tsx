"use client";

import createUserEmailPassword from "@/app/actions/user";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { Input } from "./Input";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    createUserEmailPassword,
    undefined
  );
  useEffect(() => {
    if (state?.success) {
      router.push("/");
      toast.success(state.success);
    }
    if (state?.error) toast.error(state.error);
  }, [router, state]);
  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="firstName" className="mb-1 block">
          First Name
        </label>
        <Input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Enter your first name..."
          defaultValue={state?.formFields?.firstName ?? ""}
          required
        />
        {state?.errors?.firstName && (
          <ul>
            {state.errors.firstName.map((error, index) => (
              <li className="text-red-600" key={index}>
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <label htmlFor="lastName" className="mb-1 block">
          Last Name (optional)
        </label>
        <Input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Enter your last name..."
          defaultValue={state?.formFields?.lastName ?? ""}
        />
        {state?.errors?.lastName && (
          <ul>
            {state.errors.lastName.map((error, index) => (
              <li className="text-red-600" key={index}>
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block">
          Email
        </label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email..."
          required
          defaultValue={state?.formFields?.email ?? ""}
        />
        {state?.errors?.email && (
          <ul>
            {state.errors.email.map((error, index) => (
              <li className="text-red-600" key={index}>
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block">
          Password
        </label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          required
        />
        {state?.errors?.password && (
          <ul>
            {state.errors.password.map((error, index) => (
              <li className="text-red-600" key={index}>
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="mb-1 block">
          Confirm Password
        </label>
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm your password"
          required
        />
        {state?.errors?.confirmPassword && (
          <ul>
            {state.errors.confirmPassword.map((error, index) => (
              <li className="text-red-600" key={index}>
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        disabled={pending}
        type="submit"
        className="bg-primary hover:bg-primary-hover flex h-9 w-full cursor-pointer items-center justify-center gap-x-1.5 rounded-lg px-4 py-2 text-white shadow disabled:bg-gray-600"
      >
        {pending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
        Register
      </button>
    </form>
  );
}
