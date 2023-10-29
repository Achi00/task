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
}
