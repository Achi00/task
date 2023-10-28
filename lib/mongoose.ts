import mongoose from "mongoose";

let isConnected = false; // variable to check connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("mongodb URL is not found");
  if (isConnected) return console.log("We are connected to mongodb");

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;

    console.log("Connected to mongodb");
  } catch (error) {
    console.log("failed to connect mongodb: ", error);
  }
};
