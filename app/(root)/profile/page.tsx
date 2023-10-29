import React from "react";
import {
  OrganizationSwitcher,
  SignedIn,
  SignOutButton,
  currentUser,
} from "@clerk/nextjs";
import { fetchUserImages } from "@/lib/actions/images.actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaImages } from "react-icons/fa";

interface UserIdProps {
  userId?: string;
}

const page = async () => {
  const user = await currentUser();
  const userId = user?.id;
  let data; // Declare the variable outside of the `if` block.
  if (userId) {
    data = await fetchUserImages(userId);
    console.log(data);
  }
  return (
    <div className="flex w-full flex-col items-center justify-center p-4">
      <h1 className="text-2xl">See Your Gallery</h1>
      {data.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center p-2 gap-1">
          {data.map((image: string, i: number) => (
            <img
              className="w-[350px] rounded-lg object-cover"
              src={image}
              key={i}
              alt="gallery image"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-[5vmin]">
            There are no imeges for you, go create it first
          </h1>
          <Link href="/upload-image">
            <Button className="flex gap-2 p-6 text-2xl">
              <FaImages size={25} />
              Create
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
