import { UserButton, SignIn, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { FaMousePointer, FaImages } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();

  // if (!user) return <div>Not logged in</div>;

  return (
    <div className="flex w-full p-7 flex-col text-white">
      {user && (
        <div className="flex gap-5 items-center">
          <UserButton afterSignOutUrl="/" />
          <h1>
            Welcome <span className="font-bold">{user?.firstName}</span>
          </h1>
        </div>
      )}

      <div className="flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-7 items-center justify-center py-12 px-5 w-full">
        <div className="flex justify-center items-center gap-4 flex-col xl:w-1/2 lg:w-1/2 md:w-full">
          <p className="xl:text-7xl lg:text-7xl md:text-4xl sm:text-3xl xs:text-xl flex flex-col font-bold mr-10">
            Remove Image Background By One
            <span className="flex gap-4 items-center">
              Click
              <FaMousePointer className="xl:text-4xl lg:text-4xl md:text-2xl sm:text-xl xs:text-md" />
            </span>
          </p>
          {!user ? (
            <div className="flex w-full gap-8 border-t mt-6 items-center p-2">
              <h2 className="text-lg">Sign Up and Start Using App Now</h2>
              <Link href="/sign-up">
                <Button className="flex gap-2 p-6 text-2xl">
                  <BiLogIn size={25} />
                  Sing Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex gap-8 border-t pt-4 items-center p-2">
              <h2 className="text-lg">Upload or take image with your device</h2>
              <Link href="/upload-image">
                <Button className="flex gap-2 p-6">
                  <FaImages size={25} />
                  Try Now
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div>
          <Image
            src="/assets/images/banner.png"
            width={500}
            height={520}
            objectFit="contain"
            layout="responsive"
            alt="banner"
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
}
