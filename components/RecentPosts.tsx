import { getRecentPosts } from "@/app/actions/posts";
import { extractFirstParagraph } from "@/utils/formatPosts";
import parse from "html-react-parser";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function RecentPosts() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-primary-foreground mb-8 text-3xl font-bold">
        Recent Posts
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Suspense
          fallback={
            <>
              <RecentPostSkeleton />
              <RecentPostSkeleton />
              <RecentPostSkeleton />
              <RecentPostSkeleton />
              <RecentPostSkeleton />
              <RecentPostSkeleton />
            </>
          }
        >
          <RecentPostsSuspense />
        </Suspense>
      </div>
    </section>
  );
}

async function RecentPostsSuspense() {
  const posts = (await getRecentPosts()) ?? [];
  return (
    <>
      {posts.map((post) => (
        <div
          key={post.postId}
          className="bg-background-700 rounded-lg p-6 shadow-md"
        >
          <h3 className="text-foreground mb-2 text-xl font-semibold">
            {post.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sky-600">
            {parse(extractFirstParagraph(post.content) ?? "")}
          </p>
          <Link
            href={`blog/post/${post.postId}`}
            className="flex animate-bounce cursor-pointer items-center gap-x-1.5 text-sky-700 underline visited:text-purple-700 hover:text-sky-600"
          >
            Read More <ArrowRight className="size-4" />
          </Link>
        </div>
      ))}
    </>
  );
}

function RecentPostSkeleton() {
  return (
    <div className="bg-background-700 rounded-lg p-6 shadow-md">
      <h3 className="mb-2 animate-pulse">
        <div className="bg-background-400 h-5 w-1/2 rounded-full" />
      </h3>
      <div className="mb-4 animate-pulse space-y-2">
        <div className="bg-background-400 h-4 w-full rounded-full" />
        <div className="bg-background-400 h-4 w-3/4 rounded-full" />
      </div>
      <label className="flex animate-bounce cursor-pointer items-center gap-x-1.5 text-sky-700 underline visited:text-purple-700 hover:text-sky-600">
        Read More <ArrowRight className="size-4" />
      </label>
    </div>
  );
}
