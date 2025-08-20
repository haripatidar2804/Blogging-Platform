export const firebaseAuthError = (errCode: string) => {
  switch (errCode) {
    case "auth/email-already-in-use":
    case "auth/email-already-exists":
      return "Email is already in use";
    case "auth/internal-error":
      return "Server error please try again";
    case "auth/invalid-credential":
      return "Invalid email or password";
    default:
      return "Unknown error please try again";
  }
};
