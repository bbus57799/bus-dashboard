export function getErrorMessage(error) {
  console.log("Error Occured: ", error);
  if (error?.code) {
    switch (error.code) {
      case "auth/user-not-found":
        return "Invalid email or password.";
      case "auth/wrong-password":
        return "Invalid email or password.";
      case "auth/email-already-exists":
        return "The email address is already in use by another user.";
      case "auth/invalid-password":
        return error.message;
      default:
    }
  }
  return "Error happened";
}
