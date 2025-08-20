"use client";

import { useEffect, useState } from "react";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  MenuButton,
  MenuItem,
  MenuItems,
  Switch,
} from "@headlessui/react";
import Pagination from "@/components/PaginationToolbar";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { MoreVertical, Eye, PinIcon, Trash2, Loader2 } from "lucide-react";
import {
  deletePost,
  getAllPosts,
  pinPost,
  unpinPost,
} from "@/app/actions/posts";
import { DocumentData } from "firebase/firestore";
import toast from "react-hot-toast";
import { revalidatePosts } from "@/app/actions/revalidate";

export default function PostsManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePinChange = async (postId: string, pinned: boolean) => {
    if (!pinned) {
      await pinPost(postId);
      toast.success("Post pinned");
    } else {
      await unpinPost(postId);
      toast.success("Post unpinned");
    }
    await revalidatePosts();
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId
          ? { ...post, pinned: !pinned }
          : { ...post, pinned: false }
      )
    );
  };

  const handleDeletePost = async (postId: string) => {
    await deletePost(postId);
    await revalidatePosts();
    setPosts((prevPosts) => prevPosts.filter((post) => post.postId !== postId));
    toast.success("Post deleted");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getAllPosts();
      setPosts(postsData ?? []);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="mx-auto mb-10 max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
      <h1 className="mt-10 text-center text-2xl font-semibold">
        Posts Management
      </h1>
      {isLoading ? (
        <>
          <span className="sr-only"></span>
          <Loader2 className="text-primary mx-auto mt-20 size-40 animate-spin" />
        </>
      ) : (
        <>
          <div className="w-full overflow-hidden rounded-md shadow-md">
            <div className="min-w-full overflow-x-auto">
              <table className="divide-background-200 w-full min-w-[600px] divide-y">
                <thead className="bg-background-600 text-sub-foreground">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
                    >
                      Author
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
                    >
                      Pinned
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-background-800 divide-background-200 divide-y">
                  {currentPosts.map((post) => (
                    <tr key={post.postId}>
                      <td className="text-foreground px-6 py-4 text-sm whitespace-nowrap">
                        {post.title}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        {post.authorName}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        <Switch
                          checked={post.pinned}
                          onChange={() =>
                            handlePinChange(post.postId, post.pinned)
                          }
                          className={`${
                            post.pinned ? "bg-sky-600" : "bg-gray-200"
                          } relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer`}
                        >
                          <span className="sr-only">Pin Post</span>
                          <span
                            className={`${
                              post.pinned ? "translate-x-6" : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white`}
                          />
                        </Switch>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <Menu>
                          <MenuButton className="text-foreground cursor-pointer">
                            <MoreVertical
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </MenuButton>
                          <MenuItems
                            transition
                            anchor="bottom end"
                            className="bg-background-700 text-foreground mt-4 min-w-40 origin-top space-y-1 overflow-hidden rounded-md border p-2 shadow-md transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                          >
                            <MenuItem>
                              <Link
                                href={`/blog/post/${post.postId}`}
                                className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-sky-500 hover:text-white"
                              >
                                <Eye
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                                View
                              </Link>
                            </MenuItem>
                            <MenuItem>
                              <button
                                onClick={() =>
                                  handlePinChange(post.postId, post.pinned)
                                }
                                className="group flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-sky-500 hover:text-white"
                              >
                                <PinIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                                {post.pinned ? "Unpin" : "Pin"}
                              </button>
                            </MenuItem>
                            <MenuItem>
                              <DeletePostOption
                                postId={post.postId}
                                onDeletePost={handleDeletePost}
                              />
                            </MenuItem>
                          </MenuItems>
                        </Menu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

type DeletePostOptionProps = {
  postId: string;
  onDeletePost: (postId: string) => Promise<void>;
};

function DeletePostOption({ postId, onDeletePost }: DeletePostOptionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDeletePost = async (postId: string) => {
    onDeletePost(postId);
    setIsDialogOpen(false);
  };
  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="group flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm hover:bg-red-500 hover:text-white"
      >
        <Trash2 className="mr-2 h-5 w-5" aria-hidden="true" />
        Delete
      </button>
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
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
              <Trash2 className="mb-1 size-5" /> Delete Post
            </DialogTitle>
            <Description className="text-sm text-gray-400">
              This action will remove your post completely. Are you sure you
              want to delete it?
            </Description>
            <div className="flex justify-center gap-4">
              <button
                className="flex h-9 cursor-pointer items-center justify-center gap-x-1.5 rounded-lg bg-red-700 px-4 py-2 text-white shadow hover:bg-red-600 disabled:bg-gray-600"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary hover:bg-primary-hover flex h-9 cursor-pointer items-center justify-center gap-x-1.5 rounded-lg px-4 py-2 text-white shadow disabled:bg-gray-600"
                onClick={() => {
                  handleDeletePost(postId);
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
