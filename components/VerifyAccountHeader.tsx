"use client";

import { sendEmailVerificationMail } from "@/app/actions/user";
import useUserInfo from "@/hooks/useUserInfo";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function VerifyAccountHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { authInfo } = useUserInfo();
  if (!authInfo || authInfo.emailVerified) {
    return null;
  }
  const verifyHandler = async () => {
    setIsOpen(false);
    toast.promise(sendEmailVerificationMail(), {
      loading: "Sending...",
      success: "An email was sent to verify your email",
      error: "Couldn't send email",
    });
  };
  return (
    <header className="flex items-center justify-center gap-x-1 border-yellow-700 bg-yellow-900 p-2 text-xs sm:text-base">
      <AlertCircle className="h-4 w-4 shrink-0" />
      Please verify your email address.
      <button
        className="cursor-pointer underline"
        onClick={() => setIsOpen(true)}
      >
        {"Didn't receive an email?"}
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/60 duration-300 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="max-w-lg space-y-4 rounded-xl bg-gray-900 p-12 shadow-2xl duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <DialogTitle className="text-primary-hover text-center text-xl font-bold">
              Send verification email
            </DialogTitle>
            <Description className="text-sm text-gray-400">
              This will send another email to the email address linked to your
              account to verify your account.
            </Description>
            <div className="flex justify-center gap-4">
              <button
                className="flex h-9 cursor-pointer items-center justify-center gap-x-1.5 rounded-lg bg-red-700 px-4 py-2 text-white shadow hover:bg-red-600 disabled:bg-gray-600"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary hover:bg-primary-hover flex h-9 cursor-pointer items-center justify-center gap-x-1.5 rounded-lg px-4 py-2 text-white shadow disabled:bg-gray-600"
                onClick={verifyHandler}
              >
                Send
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </header>
  );
}
