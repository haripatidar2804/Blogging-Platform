import { analytics, auth, db, provider } from "@/utils/firebase";
import { firebaseAuthError } from "@/utils/formatErrors";
import { logEvent } from "firebase/analytics";
import {
  AuthError,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { z } from "zod";

const registerSchema = z
  .object({
    firstName: z.string().max(60, "First Name must not exceed 60 charachters"),
    lastName: z
      .string()
      .max(60, "Last Name must not exceed 60 charachters")
      .optional(),
    email: z.string().email("Invalid Email").trim(),
    password: z
      .string({ invalid_type_error: "Invalid password" })
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string({ invalid_type_error: "Invalid password" })
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export default async function createUserEmailPassword(
  _prevState: unknown,
  formData: FormData
) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const validatedFields = registerSchema.safeParse({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      formFields: {
        firstName,
        lastName,
        email,
      },
    };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "users", userCredential.user.uid), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      uid: userCredential.user.uid,
      role: "user",
      joinedAt: userCredential.user.metadata.creationTime,
      avatar: userCredential.user.photoURL,
    });
    await sendEmailVerification(userCredential.user);
    return {
      success: `An email was sent to ${userCredential?.user.email} to verify your account`,
    };
  } catch (error) {
    const err = error as AuthError;
    return {
      error: firebaseAuthError(err.code),
      formFields: {
        firstName,
        lastName,
        email,
      },
    };
  }
}

export const logout = async () => {
  try {
    await fetch("/api/set-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: "loggedout" }),
    });
    await signOut(auth);
  } catch (error) {
    const err = error as AuthError;
    return {
      error: err.message,
    };
  }
};

const loginSchema = z.object({
  email: z.string().email("Invalid Email").trim(),
  password: z.string({ invalid_type_error: "Invalid password" }),
});

export const loginUserEmailPassword = async (
  _prevState: unknown,
  formData: FormData
) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const validatedFields = loginSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email,
    };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    await fetch("/api/set-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: userCredential.user.getIdToken() }),
    });
    if (analytics)
      logEvent(analytics, "login", {
        method: "email_password",
        user_id: userCredential.user.uid,
      });
    return {
      success: "Successfully logged in",
    };
  } catch (error) {
    const err = error as AuthError;
    return {
      error: firebaseAuthError(err.code),
      email,
    };
  }
};

export const loginUserGoogle = async () => {
  try {
    const { user } = await signInWithPopup(auth, provider);
    await fetch("/api/set-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: user.getIdToken() }),
    });
    if (analytics)
      logEvent(analytics, "login", {
        method: "google",
        user_id: user.uid,
      });
    try {
      const userDB = await getDoc(doc(db, "users", user.uid));
      if (userDB.exists()) return;
      await setDoc(doc(db, "users", user.uid), {
        firstName: user.displayName?.split(" ")[0],
        lastName: user.displayName?.split(" ")[1],
        email: user.email,
        uid: user.uid,
        role: "user",
        joinedAt: user.metadata.creationTime,
        avatar: user.photoURL,
      });
      await sendEmailVerification(user);
    } catch (error) {
      const err = error as AuthError;
      firebaseAuthError(err.code);
      return {
        error: "Error signing in with google",
      };
    }
  } catch (error) {
    const err = error as AuthError;
    return {
      error: err.message,
    };
  }
};

export const forgotPassword = async (
  _prevState: unknown,
  formData: FormData
) => {
  const email = formData.get("email") as string;

  const validatedEmail = z
    .string()
    .email("Invalid Email")
    .trim()
    .safeParse(email);

  if (!validatedEmail.success) {
    return {
      errors: validatedEmail.error.message,
    };
  }

  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: "An email was sent with the instructions",
    };
  } catch (error) {
    const err = error as AuthError;
    return {
      error: err.message,
    };
  }
};

export const sendEmailVerificationMail = async () => {
  if (!auth.currentUser) {
    throw new Error("No authenticated user found");
  }
  try {
    await sendEmailVerification(auth.currentUser);
    return "Verification email sent";
  } catch (error) {
    const err = error as AuthError;
    throw new Error(err.message);
  }
};
