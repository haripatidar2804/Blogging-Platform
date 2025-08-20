"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEventHandler, useEffect, type ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MEDIUM_SCREEN_WIDTH = 768;

export function Sidebar({ children, isOpen, setIsOpen }: SidebarProps) {
  useEffect(() => {
    const sidebarHandler = () => {
      if (window.innerWidth > MEDIUM_SCREEN_WIDTH) setIsOpen(false);
    };
    window.addEventListener("resize", sidebarHandler);
    const closeSidebarHandler = () => setIsOpen(false);
    window.addEventListener("closeSidebar", closeSidebarHandler);
    return () => {
      window.removeEventListener("resize", sidebarHandler);
      window.removeEventListener("closeSidebar", closeSidebarHandler);
    };
  });
  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition duration-200 ease-in-out md:hidden md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div
          className={`bg-background-700 flex h-dvh w-64 flex-col overflow-y-auto`}
        >
          {children}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

interface SidebarHeaderProps {
  children: ReactNode;
}

export function SidebarHeader({ children }: SidebarHeaderProps) {
  return <div className="bg-secondary p-4 text-white">{children}</div>;
}

interface SidebarContentProps {
  children: ReactNode;
}

export function SidebarContent({ children }: SidebarContentProps) {
  return <div className="flex-1 overflow-y-auto p-4">{children}</div>;
}

type SidebarLinkItemProps = {
  href: string;
  icon: ReactNode;
  children: ReactNode;
};

export function SidebarLinkItem({
  href,
  icon,
  children,
}: SidebarLinkItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      onClick={() => window.dispatchEvent(new Event("closeSidebar"))}
      href={href}
      className={`flex items-center space-x-3 rounded-md px-3 py-2 transition-colors ${
        isActive ? "bg-primary text-white" : "hover:bg-primary hover:text-white"
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

type SidebarButtonItemProps = {
  icon: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

export function SidebarButtonItem({
  onClick,
  icon,
  children,
}: SidebarButtonItemProps) {
  return (
    <button
      onClick={(e) => {
        onClick(e);
        window.dispatchEvent(new Event("closeSidebar"));
      }}
      className="hover:bg-primary flex w-full cursor-pointer items-center space-x-3 rounded-md px-3 py-2 transition-colors hover:text-white"
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

interface SidebarSectionProps {
  title: string;
  children: ReactNode;
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="mb-6">
      <h3 className="mb-2 text-sm font-semibold tracking-wider uppercase">
        {title}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
