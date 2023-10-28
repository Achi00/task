// api/updateUserImage.ts

import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function GET(req: NextApiRequest) {
  return new Response("hi");
}

export async function POST(req: NextRequest) {
  await connectToDB();
  // res.status(200).json({ message: "Hello from uploadimg!" });
  // if (req.method !== "POST") {
  //   return res.status(405).end();
  // }

  const body = await req.json();

  console.log(body);
  // const userId = req.body.userId;
  return new Response("ok");

  // try {
  //   const response = await cloudinary.uploader.upload(file);
  //   const imageUrl = response.secure_url;

  //   if (userId) {
  //     const user = await User.findOneAndUpdate(
  //       { id: userId },
  //       { image: imageUrl },
  //       { new: true }
  //     );
  //     if (!user) {
  //       return res.status(404).json({ error: "User not found" });
  //     }
  //     res.status(200).json({ user });
  //   } else {
  //     console.log("User not found/no user id");
  //   }
  // } catch (error) {
  //   console.error("Upload failed:", error);
  //   res.status(500).json({ error: "Upload failed" });
  // }
}
