"use client";

import { extractFirstParagraph, fortmatDate } from "@/utils/formatPosts";
import parse from "html-react-parser";
import Link from "next/link";
import Pagination from "./PaginationToolbar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";

export default function PaginatedPosts({ posts }: { posts: DocumentData[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page: number) => {
    router.push(`/blog?page=${page}`);
  };
  return (
    <>
      {currentPosts.map((post) => (
        <article
          key={post.postId}
          className="border-background-200 border-b pb-8"
        >
          <Link href={`/blog/post/${post.postId}`} className="block">
            <h2 className="text-primary-foreground hover:text-primary-hover mb-2 text-2xl font-bold">
              {post.title}
            </h2>
            <p className="text-foreground mb-4 line-clamp-2">
              {parse(extractFirstParagraph(post.content) ?? "")}
            </p>
            <div className="text-sub-foreground flex flex-wrap items-center text-sm">
              <span>{post.authorName}</span>
              <span className="mx-2">·</span>
              <span>{fortmatDate(post.createdAt)}</span>
              <span>
                <span className="mx-2">·</span>
                {post.readInMins === "1"
                  ? `${post.readInMins} min read`
                  : `${post.readInMins} mins read`}
              </span>
            </div>
          </Link>
        </article>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
