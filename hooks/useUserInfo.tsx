import { auth, db } from "@/utils/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { useEffect, useState, useMemo } from "react";

export default function useUserInfo() {
  const [user, setUser] = useState<DocumentData | undefined | null>();
  const [authInfo, setAuthInfo] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (!authUser) {
        setAuthInfo(null);
        setUser(null);
        setIsLoading(false);
        return;
      }

      setAuthInfo(authUser);

      try {
        const userSnap = await getDoc(doc(db, "users", authUser.uid));
        setUser(userSnap.exists() ? userSnap.data() : null);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return useMemo(
    () => ({ isLoading, user, authInfo }),
    [isLoading, user, authInfo]
  );
}
