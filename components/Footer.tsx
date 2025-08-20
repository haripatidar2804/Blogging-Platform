import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-sky-900 py-8 text-sky-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          <div className="mb-6 w-full md:mb-0 md:w-1/3">
            <h3 className="mb-2 text-xl font-semibold">About Next Blog</h3>
            <p className="text-balance text-sky-300">
              Bringing you the latest insights and trends in technology and
              beyond.
            </p>
          </div>
          <div className="mb-6 w-full md:mb-0 md:w-1/3">
            <h3 className="mb-2 text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sky-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sky-300 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/new"
                  className="text-sky-300 hover:text-white"
                >
                  Create Post
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="mb-2 text-xl font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-sky-300 hover:text-white">
                Linked In
              </a>
              <a href="#" className="text-sky-300 hover:text-white">
                Facebook
              </a>
              <a href="#" className="text-sky-300 hover:text-white">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-base text-sky-400">
            &copy; {new Date().getFullYear()} Next Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
