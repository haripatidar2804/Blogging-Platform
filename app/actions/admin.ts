import { db } from "@/utils/firebase";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const changeUserRole = async (uid: string, role: string) => {
  try {
    await updateDoc(doc(db, "users", uid), {
      role,
    });
  } catch (error) {
    console.log(error);
  }
};

export const changeUserBan = async (uid: string, isBanned: boolean) => {
  try {
    await updateDoc(doc(db, "users", uid), {
      isBanned,
    });
  } catch (error) {
    console.log(error);
  }
};

export const changePostPermission = async (roles: string) => {
  try {
    let canPost = ["admin"];
    if (roles === "editors") {
      canPost.push("editor");
    } else if (roles === "all") {
      canPost = ["admin", "editor", "user"];
    }
    await updateDoc(doc(db, "settings", "post-permissions"), {
      canPost,
    });
  } catch (error) {
    console.log(error);
  }
};
