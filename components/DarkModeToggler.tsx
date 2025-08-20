"use client";

import { getTheme } from "@/utils/sessionSettings";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Check, Moon, Settings, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

export default function DarkModeToggler() {
  const [siteTheme, setSiteTheme] = useState<Theme>();
  const preferDarkMode =
    siteTheme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : siteTheme === "dark";

  function changeTheme(theme: Theme) {
    if (theme) {
      setSiteTheme(theme);
      if (theme === "system") {
        localStorage.removeItem("userTheme");
      } else {
        localStorage.setItem("userTheme", theme);
      }
    }
  }

  useEffect(() => {
    setSiteTheme(getTheme());
  }, [siteTheme]);
  return (
    <Menu>
      <MenuButton className="cursor-pointer">
        <>
          {preferDarkMode ? (
            <Sun className="inline size-8" />
          ) : (
            <Moon className="inline size-8" />
          )}
        </>
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="bg-background-700 text-foreground mt-4 min-w-40 origin-top overflow-hidden rounded-md border p-2 shadow-md transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <button
            onClick={() => {
              if (siteTheme !== "system") changeTheme("system");
            }}
            className="hover:bg-background-500 flex w-full cursor-pointer items-center gap-x-1 rounded-md p-1.5 text-left text-sm"
          >
            <Settings className="size-3.5" /> System
            {siteTheme === "system" && <Check className="ml-auto size-4" />}
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={() => {
              if (siteTheme !== "dark") changeTheme("dark");
            }}
            className="hover:bg-background-500 flex w-full cursor-pointer items-center gap-x-1 rounded-md p-1.5 text-left text-sm"
          >
            <Moon className="size-3.5" /> Dark
            {siteTheme === "dark" && <Check className="ml-auto size-4" />}
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={() => {
              if (siteTheme !== "light") changeTheme("light");
            }}
            className="hover:bg-background-500 flex w-full cursor-pointer items-center gap-x-1 rounded-md p-1.5 text-left text-sm"
          >
            <Sun className="size-3.5" /> Light
            {siteTheme === "light" && <Check className="ml-auto size-4" />}
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
