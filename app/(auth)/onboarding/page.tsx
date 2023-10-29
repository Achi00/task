import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";
import { useRouter } from "next/router";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  // if (userInfo) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <main className="flex w-full bg-black items-center flex-col justify-center h-screen ">
      <h1 className="text-2xl text-white">Onboarding</h1>
      <p className="mt-3 text-base-regular text-gray-400">
        Almost there, finish your profile to use app
      </p>

      <section className="mt-9 bg-dark-3 rounded-3xl p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default Page;
