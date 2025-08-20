import { getPinnedPost } from "@/app/actions/posts";
import { extractFirstParagraph } from "@/utils/formatPosts";
import parse from "html-react-parser";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function PinnedPost() {
  const post = await getPinnedPost();

  return (
    <>
      {post && (
        <section className="bg-background-800 py-16">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold text-primary-foreground">
              Pinned Post
            </h2>
            <div className="rounded-lg bg-sky-100 p-8 shadow-lg">
              <h3 className="mb-4 text-2xl font-semibold text-sky-800">
                {post.title}
              </h3>
              <p className="mb-4 line-clamp-2 text-sky-700">
                {parse(extractFirstParagraph(post.content) ?? "")}
              </p>
              <Link
                href={`/blog/post/${post.postId}`}
                className="flex animate-bounce cursor-pointer items-center gap-x-1.5 text-sky-700 underline visited:text-purple-700 hover:text-sky-600"
              >
                Read More <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
