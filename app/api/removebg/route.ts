import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  return new Response("hi");
}

export async function POST(file: File): Promise<any> {
  // Create a FormData object to send the image file to the API
  const data = new FormData();
  data.append("file", file);

  // Set the Rapid API key and host headers
  const options = {
    method: "POST",
    headers: {
      "X-RapidAPI-Key": "532606fd5amshbfdbc1bd5ff8f44p190eb2jsnc5d1642e27ba",
      "X-RapidAPI-Host": "background-removal13.p.rapidapi.com",
    },
    body: data,
  };

  // Send the POST request to the Rapid API
  try {
    const response = await fetch(
      "https://background-removal13.p.rapidapi.com/api/v1/uploadFile",
      options
    );
    const result = await response.json();

    // Return the processed image to the client
    return result;
  } catch (error: any) {
    // Handle any errors
    return { error: error.message };
  }
}
