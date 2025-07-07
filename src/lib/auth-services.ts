"use server";

import { signIn, signOut } from "@/auth";

export const handleSignOut = async () => {
  await signOut();
};

export const handleSignIn = async () => {
  try {
    await signIn("google");
  } catch (error) {
    console.log(error);
  }
};
