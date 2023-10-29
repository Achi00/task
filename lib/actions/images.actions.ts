// images.action.js

"use server";

import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  userId: string;
  imageUrl: string;
}

export async function addImageToUser({ userId, imageUrl }: Params) {
  try {
    connectToDB();

    // Find user by userId and push imageUrl to images array
    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      { $push: { images: imageUrl } },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    const userObj = updatedUser.toObject();
    const cleanUserObj = JSON.parse(JSON.stringify(userObj));
    return cleanUserObj;
  } catch (error: any) {
    throw new Error(`Failed to add image to user: ${error.message}`);
  }
}

export async function fetchUserImages(userId: string) {
  try {
    await connectToDB();
    const user = await User.findOne({ id: userId });

    if (!user) {
      throw new Error("User not found");
    }

    return user.images; // This will return an array of image URLs
  } catch (error: any) {
    throw new Error(`Failed to fetch user images: ${error.message}`);
  }
}
