import { getAuth, onIdTokenChanged } from "firebase/auth";

export function startTokenListener() {
  const auth = getAuth();

  onIdTokenChanged(auth, async (user) => {
    if (user) {
      const idToken = await user.getIdToken();
      await fetch("/api/set-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
    } else {
      await fetch("/api/set-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: "loggedout" }),
      });
    }
  });
}


export const getTheme = () => {
  if (
    localStorage.getItem("userTheme") === "dark" ||
    localStorage.getItem("userTheme") === "light"
  ) {
    const userPrefrence = localStorage.getItem("userTheme");
    if (userPrefrence === "dark") {
      document.body.classList.add("dark");
      return "dark";
    } else if (userPrefrence === "light") {
      document.body.classList.remove("dark");
      return "light";
    }
  } else {
    const preferDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (preferDarkMode) {
      document.body.classList.add("dark");
      return "system";
    } else {
      document.body.classList.remove("dark");
      return "system";
    }
  }
}