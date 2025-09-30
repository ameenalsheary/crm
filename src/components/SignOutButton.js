"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      className="w-72 bg-red-400 text-white py-2 px-4 rounded-md focus:outline-none  cursor-pointer"
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
    >
      Sign Out
    </button>
  );
}
