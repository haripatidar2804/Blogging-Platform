import { Input } from "@/components/Input";
import PinnedPost from "@/components/PinnedPost";
import RecentPosts from "@/components/RecentPosts";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="bg-background-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-foreground text-4xl font-extrabold sm:text-5xl md:text-6xl">
              <span className="block">Welcome to</span>
              <span className="block text-sky-600">Next Blog</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Explore our latest thoughts and ideas on technology, design, and
              more.
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <Link
                href="/blog"
                className="h-9 rounded-lg bg-sky-600 px-4 py-2 text-white shadow-md hover:bg-sky-500"
              >
                Read Latest Post
              </Link>
            </div>
          </div>
        </div>
      </header>

      <PinnedPost />

      <RecentPosts />

      <section className="bg-sky-100 py-16">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-sky-900">Stay Updated</h2>
          <p className="mb-8 text-sky-700">
            Subscribe to our newsletter for the latest blog posts and updates.
          </p>
          <form className="mx-auto flex max-w-md gap-4">
            <Input type="email" required placeholder="Enter your email" />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover flex h-9 cursor-pointer items-center justify-center gap-x-1.5 rounded-lg px-4 py-2 text-white shadow"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
