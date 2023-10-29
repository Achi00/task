import {
  OrganizationSwitcher,
  SignedIn,
  SignOutButton,
  currentUser,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { BiLogIn } from "react-icons/bi";
import { Button } from "@/components/ui/button";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-dark-2 px-6 py-3">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/icons/home.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Home</p>
      </Link>

      <div className="flex items-center gap-3">
        <SignedIn>
          <div className="text-xl font-semibold border rounded-md px-2 py-1">
            <Link href="/profile">Profile</Link>
          </div>
          <UserButton afterSignOutUrl="/" />
          <SignOutButton>
            <div className="flex cursor-pointer">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
            </div>
          </SignOutButton>
        </SignedIn>

        {!user && (
          <Link href="/sign-in">
            <Button className="flex gap-2 text-xl">
              <BiLogIn size={25} />
              Sing In
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
