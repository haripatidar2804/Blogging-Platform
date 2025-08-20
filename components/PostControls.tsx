"use client";

import { Pencil } from "lucide-react";
import Link from "next/link";
import DeletePostButton from "./DeletePostButton";
import useUserInfo from "@/hooks/useUserInfo";

export default function PostControls({
  postId,
  authorId,
}: {
  postId: string;
  authorId: string;
}) {
  const { user } = useUserInfo();

  if (user?.role !== "admin" && user?.uid !== authorId) return null;

  return (
    <div className="mb-4 flex items-center gap-x-3">
      <Link
        href={`/blog/post/${postId}/edit`}
        className="flex w-fit items-center justify-center gap-x-2 rounded-xl border-3 border-sky-600 px-4 py-1.5 text-sky-600 hover:bg-sky-600 hover:text-white"
      >
        <Pencil className="size-4" />
        Edit
      </Link>
      <DeletePostButton postId={postId} />
    </div>
  );
}
