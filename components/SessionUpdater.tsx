"use client";

import { useEffect } from "react";
import { getTheme, startTokenListener } from "@/utils/sessionSettings";

export default function SessionUpdater() {
  useEffect(() => {
    getTheme()
    startTokenListener();
  }, []);

  return null;
}
