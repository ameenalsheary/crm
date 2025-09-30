import Image from "next/image";
import { redirect } from "next/navigation";

import { auth } from "../../../auth";
import SignOutButton from "@/components/SignOutButton";

export default async function Dashboard() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2 min-h-screen">
      <Image
        src={user.image}
        width={100}
        height={100}
        alt="User profile picture"
        priority
        className="rounded-full mb-4"
      />
      <h1 className="text-2xl">
        Welcome, <span className="font-bold">{user.name}</span>{" "}
      </h1>
      <span>{user.email}</span>
      <span className="text-sm italic">Role: {user.role}</span>
      <SignOutButton />
    </div>
  );
}
