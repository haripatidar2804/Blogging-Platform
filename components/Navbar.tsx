"use client";

import { logout } from "@/app/actions/user";
import useUserInfo from "@/hooks/useUserInfo";
import {
  BookOpenText,
  ChevronDown,
  Home,
  LogInIcon,
  LogOut,
  LogOutIcon,
  MenuIcon,
  PenBoxIcon,
  UserCircle2Icon,
  UserPlus2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Sidebar,
  SidebarButtonItem,
  SidebarContent,
  SidebarHeader,
  SidebarLinkItem,
} from "./Sidebar";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import UserAvatar from "./UserAvatar";
import DarkModeToggler from "./DarkModeToggler";

export default function Navbar() {
  const { user, isLoading } = useUserInfo();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <nav className="bg-secondary py-3">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 text-white sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold sm:text-2xl">
          Next Blog
        </Link>
        <ul className="hidden gap-x-3 md:flex">
          <li>
            <Link href="/" className="hover:text-sky-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-sky-200">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/blog/new" className="hover:text-sky-200">
              Create Post
            </Link>
          </li>
        </ul>
        <div className="flex items-center justify-center space-x-3">
          <DarkModeToggler />
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="cursor-pointer md:hidden"
          >
            {isSidebarOpen ? (
              <X className="size-8" />
            ) : (
              <MenuIcon className="size-8" />
            )}
          </button>
          {isLoading ? (
            <UserCircle2Icon className="size-8" />
          ) : (
            <>{user ? <NavUserIcon /> : <NavNoUserIcon />}</>
          )}
        </div>
      </div>
      <Sidebar setIsOpen={setIsSidebarOpen} isOpen={isSidebarOpen}>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-3 right-3 cursor-pointer text-white"
        >
          <X />
        </button>
        <NavSidebar />
      </Sidebar>
    </nav>
  );
}

function NavUserIcon() {
  const { user } = useUserInfo();
  return (
    <>
      {user && (
        <Menu>
          <MenuButton className="cursor-pointer">
            <UserAvatar fontSize="text-sm" />
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom end"
            className="bg-background-700 text-foreground mt-4 min-w-40 origin-top overflow-hidden rounded-md border p-2 shadow-md transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <MenuItem as="div" className="p-1.5">
              <h2 className="text-base font-semibold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-xs text-sub-foreground">
                {user.email}
              </p>
            </MenuItem>
            <MenuSeparator className="bg-foreground/70 my-1 h-px" />
            <MenuItem>
              <button
                onClick={logout}
                className="hover:bg-background-500 flex w-full cursor-pointer items-center justify-between rounded-md p-1.5"
              >
                Sign Out <LogOutIcon className="size-4" />
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      )}
    </>
  );
}

function NavNoUserIcon() {
  return (
    <>
      <Menu>
        <MenuButton className="cursor-pointer">
          <UserCircle2Icon className="size-8" />
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="bg-background-700 text-foreground mt-4 min-w-40 origin-top overflow-hidden rounded-md border p-2 shadow-md transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <MenuItem>
            <Link
              href="/login"
              className="hover:bg-background-500 flex w-full cursor-pointer items-center justify-between rounded-md p-1.5"
            >
              Sign In <LogInIcon className="size-4" />
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/register"
              className="hover:bg-background-500 flex w-full cursor-pointer items-center justify-between rounded-md p-1.5"
            >
              Sign Up <UserPlus2 className="size-4" />
            </Link>
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  );
}

function NavSidebar() {
  const { user, isLoading } = useUserInfo();
  return (
    <>
      {!isLoading && (
        <SidebarHeader>
          {user ? (
            <div className="flex items-center space-x-3 pt-2">
              <UserAvatar sizeClass="size-10" />
              <div>
                <h2 className="text-lg font-semibold">{user.firstName}</h2>
                <p className="text-sm text-gray-300">{user.email}</p>
              </div>
            </div>
          ) : (
            <div className="pt-2">
              <div className="flex items-center space-x-3">
                <UserCircle2Icon className="size-10 rounded-full text-gray-400" />
                <div>
                  <h2 className="text-base font-medium text-gray-300">
                    Sign in or Sign up
                  </h2>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <SidebarLinkItem
                  href="/login"
                  icon={<LogInIcon className="size-5" />}
                >
                  Sign In
                </SidebarLinkItem>
                <SidebarLinkItem
                  href="/register"
                  icon={<UserPlus2 className="size-5" />}
                >
                  Sign Up
                </SidebarLinkItem>
              </div>
            </div>
          )}
        </SidebarHeader>
      )}
      <SidebarContent>
        <Disclosure as="div">
          {({ open }) => (
            <>
              <DisclosureButton className="mb-2 flex w-full cursor-pointer items-center justify-between py-2">
                Navigation
                <ChevronDown
                  className={`size-6 transition-transform duration-500 ease-in-out ${open ? "rotate-180" : ""}`}
                />
              </DisclosureButton>
              <DisclosurePanel
                transition
                className="mb-4 origin-top space-y-1.5 transition duration-500 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
              >
                <SidebarLinkItem href="/" icon={<Home className="size-5" />}>
                  Home
                </SidebarLinkItem>
                <SidebarLinkItem
                  href="/blog"
                  icon={<BookOpenText className="size-5" />}
                >
                  Blog
                </SidebarLinkItem>
                <SidebarLinkItem
                  href="/blog/new"
                  icon={<PenBoxIcon className="size-5" />}
                >
                  Create Post
                </SidebarLinkItem>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
        {user && (
          <Disclosure as="div">
            {({ open }) => (
              <>
                <DisclosureButton className="mb-2 flex w-full cursor-pointer items-center justify-between py-2">
                  Account
                  <ChevronDown
                    className={`size-6 transition-transform duration-500 ease-in-out ${open ? "rotate-180" : ""}`}
                  />
                </DisclosureButton>
                <DisclosurePanel
                  transition
                  className="mb-4 origin-top space-y-1.5 transition duration-500 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
                >
                  <SidebarButtonItem
                    onClick={logout}
                    icon={<LogOut className="size-5" />}
                  >
                    Logout
                  </SidebarButtonItem>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        )}
      </SidebarContent>
    </>
  );
}
