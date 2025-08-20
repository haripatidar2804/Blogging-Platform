"use client";

import parse from "html-react-parser";
import { useEffect, useState } from "react";
import TiptapEditor from "@/components/Editor";
import { Input } from "@/components/Input";
import { notFound, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { editPost, getPostById } from "@/app/actions/posts";
import useUserInfo from "@/hooks/useUserInfo";
import { DocumentData } from "firebase/firestore";
import toast from "react-hot-toast";
import { revalidatePosts } from "@/app/actions/revalidate";

export default function EditPostPage() {
  const { postId } = useParams<{ postId: string }>();
  const { user } = useUserInfo();
  const [postData, setPostData] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [post, setPost] = useState<DocumentData | null | undefined>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const handleSave = async (content: string) => {
    try {
      setPostData(content);
      await editPost(post?.postId, postTitle, content);
      await revalidatePosts()
      router.push(`/blog/post/${post?.postId}`);
      toast.success("Saved changes");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    const fetchPostData = async () => {
      setIsLoading(true);
      const post = await getPostById(postId);

      if (!post) return notFound();

      setPostData(post.content);
      setPostTitle(post.title);
      setPost(post);
      setIsLoading(false);
    };

    fetchPostData();
  }, []);

  useEffect(() => {
    if (user === undefined || isLoading) return;

    if (user === null) {
      router.replace("/login");
    }
    if (user?.isBanned) router.replace("/banned");
    if (post?.author !== user?.uid && user?.role !== "admin") {
      router.replace(`/blog/post/${post?.postId}`);
    }
  }, [user, isLoading, post, router]); // Only run when all dependencies are loaded

  return (
    <main className="bg-background-700 min-h-screen py-16">
      {isLoading ? (
        <>
          <span className="sr-only"></span>
          <Loader2 className="text-primary mx-auto mt-20 size-40 animate-spin" />
        </>
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link
            href={`/blog/post/${post?.postId}`}
            className="mb-8 inline-flex items-center gap-x-1.5 text-sky-600 hover:text-sky-500"
          >
            <ArrowLeft className="size-4" />
            Back to post
          </Link>
          <h1 className="mb-8 text-3xl font-bold text-primary-foreground">
            Edit Post
          </h1>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="mb-2 block font-medium text-sub-foreground"
            >
              Title
            </label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Enter a title..."
              value={postTitle}
              onChange={(e) => setPostTitle(e.currentTarget.value)}
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block font-medium text-sub-foreground">
              Content
            </label>
            <TiptapEditor
              initialContent={postData}
              onPreview={setPostData}
              onSave={handleSave}
              saveButtonLabel="Save Changes"
            />
          </div>
          <h2 className="mb-2 font-medium text-sub-foreground">
            Preview
          </h2>
          <div className="tiptap border-foreground/30 bg-background mt-4 rounded-lg border p-4">
            {postData && <>{parse(postData)}</>}
          </div>
        </div>
      )}
    </main>
  );
}
