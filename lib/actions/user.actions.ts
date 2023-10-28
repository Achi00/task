"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import path from "path";

interface Params {
  userId: string;
  username: string;
  name: string;
  image: string;
  path: string;
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function updateUserOrCreate({
  userId,
  username,
  name,
  image,
  path,
}: Params): Promise<void> {
  try {
    await connectToDB();

    // Attempt to find and update, or create a new user
    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, image },
      { upsert: true, new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error("Failed to create or update the user.");
    }

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    // Log the error or send it to an error tracking service
    console.error("Error in updateUserOrCreate:", error);

    // Rethrow or handle the error as needed
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
