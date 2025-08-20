import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Ban, PinIcon } from "lucide-react";
import Link from "next/link";
import parse from "html-react-parser";
import { fortmatDate } from "@/utils/formatPosts";
import { getPostById } from "@/app/actions/posts";
import PostControls from "@/components/PostControls";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = await getPostById(postId);
  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-x-1.5 text-sky-600 hover:text-sky-500"
      >
        <ArrowLeft className="size-4" />
        Back to all posts
      </Link>
      {post.pinned && (
        <p className="mb-4 flex items-center gap-x-2 text-xl text-sky-700">
          <PinIcon className="size-5 rotate-45" /> Pinned
        </p>
      )}
      <h1 className="text-foreground mb-4 text-4xl font-bold">{post.title}</h1>
      <div className="mb-6 flex items-center">
        {post.authorAvatar ? (
          <Image
            src={post.authorAvatar ?? "User"}
            alt={post.authorName}
            width={40}
            height={40}
            className="mr-4 shrink-0 rounded-full"
          />
        ) : (
          <div className="border-primary-hover text-primary-hover mr-4 flex size-10 shrink-0 items-center justify-center rounded-full border-2 bg-gray-400 text-xl select-none">
            {post.authorName ? (
              <>{post.authorName.slice(0, 2).toUpperCase()}</>
            ) : (
              <Ban className="size-10 shrink-0" />
            )}
          </div>
        )}
        <div>
          <p className="text-primary-foreground text-lg font-semibold">
            {post.authorName ? <>{post.authorName}</> : "Deleted Account"}
          </p>
          <p className="text-sm text-gray-500">
            {fortmatDate(post.createdAt)}
            <span className="mx-2">·</span>
            <span>
              {post.readInMins === "1"
                ? `${post.readInMins} min read`
                : `${post.readInMins} mins read`}
            </span>
          </p>
        </div>
      </div>
      <PostControls postId={postId} authorId={post.author} />
      <div className="tiptap">{parse(post.content)}</div>
    </article>
  );
}
