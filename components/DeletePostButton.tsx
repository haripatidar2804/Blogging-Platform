"use client";

import { deletePost } from "@/app/actions/posts";
import { revalidatePosts } from "@/app/actions/revalidate";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeletePostButton({ postId }: { postId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    await deletePost(postId);
    await revalidatePosts()
    setIsOpen(false);
    router.push("/blog");
    toast.success("Post deleted");
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-fit cursor-pointer items-center justify-center gap-x-2 rounded-xl border-3 border-red-600 px-3.5 py-1.5 text-red-600 hover:bg-red-600 hover:text-white"
      >
        <Trash2Icon className="size-4" />
        Delete
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
            <DialogTitle className="text-primary-hover flex items-center justify-center gap-x-2 text-xl font-bold">
              <Trash2Icon className="mb-1 size-5" /> Delete Post
            </DialogTitle>
            <Description className="text-sm text-gray-400">
              This action will remove your post completely. Are you sure you
              want to delete it?
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
                onClick={() => {
                  handleDelete();
                }}
              >
                Delete
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
