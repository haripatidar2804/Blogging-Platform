import { db } from "@/utils/firebase";
import { estimateReadTime } from "@/utils/formatPosts";
import {
  collection,
  deleteDoc,
  doc,
  FirestoreError,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export const getRecentPosts = async () => {
  try {
    const q = query(
      collection(db, "posts"),
      orderBy("updatedAt", "desc"),
      limit(6)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));

    const posts = await Promise.all(
      querySnapshot.docs.map(async (postDoc) => {
        const post = postDoc.data();
        const authorSnap = await getDoc(doc(db, "users", post.author));

        if (authorSnap.exists()) {
          const author = authorSnap.data();
          return {
            ...post,
            authorName: `${author.firstName} ${author.lastName}`,
            authorAvatar: author.avatar,
          };
        }
        return post;
      })
    );

    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPostById = async (postId: string) => {
  try {
    const postSnap = await getDoc(doc(db, "posts", postId));
    if (postSnap.exists()) {
      const post = postSnap.data();
      const authorSnap = await getDoc(doc(db, "users", post.author));
      if (authorSnap.exists()) {
        const author = authorSnap.data();
        return {
          ...post,
          authorName: `${author.firstName} ${author.lastName}`,
          authorAvatar: author.avatar,
        };
      }
      return post;
    }
  } catch (error) {
    const err = error as FirestoreError;
    console.error(`Error fetching post ${postId}:`, err.message);
    return null;
  }
};

export const createPost = async (
  title: string,
  content: string,
  authorId: string
) => {
  try {
    const postId = crypto.randomUUID();
    await setDoc(doc(db, "posts", postId), {
      postId,
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: authorId,
      pinned: false,
      readInMins: `${estimateReadTime(content)}`,
    });
    return postId;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const editPost = async (
  postId: string,
  title: string,
  content: string
) => {
  try {
    await updateDoc(doc(db, "posts", postId), {
      title,
      content,
      updatedAt: new Date().toISOString(),
      readInMins: `${estimateReadTime(content)}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postId: string) => {
  try {
    await deleteDoc(doc(db, "posts", postId));
  } catch (error) {
    console.log(error);
  }
};

export const getPinnedPost = async () => {
  try {
    const q = query(
      collection(db, "posts"),
      where("pinned", "==", true),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data();
  } catch (error) {
    console.log(error);
  }
};

export const pinPost = async (postId: string) => {
  try {
    // unpin old post
    const q = query(
      collection(db, "posts"),
      where("pinned", "==", true),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length) {
      const oldPinnedPost = querySnapshot.docs[0].data();
      await updateDoc(doc(db, "posts", oldPinnedPost.postId), {
        pinned: false,
      });
    }

    //pin new post
    await updateDoc(doc(db, "posts", postId), {
      pinned: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const unpinPost = async (postId: string) => {
  try {
    await updateDoc(doc(db, "posts", postId), {
      pinned: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPostPermission = async () => {
  try {
    const docSnap = await getDoc(doc(db, "settings", "post-permissions"));
    return docSnap.data();
  } catch (error) {
    console.log(error);
  }
};
