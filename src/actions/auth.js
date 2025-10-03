"use server";

import bcrypt from "bcryptjs";

import { signIn as nextAuthSignIn } from "../../auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function signUp(formData) {
  const userData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    await connectDB();

    let existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return {
        success: false,
        error: "This email is already in use. Please use another email.",
      };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    await User.create({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
    });

    await nextAuthSignIn("credentials", {
      email: userData.email,
      password: userData.password,
      redirect: false,
    });

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}

export async function signIn(formData) {
  const userData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    await nextAuthSignIn("credentials", {
      email: userData.email,
      password: userData.password,
      redirect: false,
    });

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: "Invalid email or password",
    };
  }
}
