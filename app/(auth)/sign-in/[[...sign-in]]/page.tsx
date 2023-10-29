import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Image
        src="/assets/images/auth.jpg"
        fill
        alt="auth image"
        className="object-cover absolute" // Adjust according to your needs
      />
      <div className="flex p-[3vmin] flex-wrap relative z-10 gap-5 items-center justify-center">
        <div className="flex flex-col">
          <h1 className="font-extrabold xl:text-4xl lg:text-3xl xs:text-2xl">
            Sign in to start using app
          </h1>
          <h2>Your data is secured</h2>
          <h3 className="text-gray-500">
            By Loging in with Google you agree terms and conditions
          </h3>
        </div>
        <div className="text-2xl">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
