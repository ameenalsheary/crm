"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function GoogleAuthButton() {
  return (
    <button
      className="w-full border rounded-md px-4 py-2 shadow-md cursor-pointer hover:bg-background-secondary flex items-center justify-center gap-2 focus:outline-none"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
    >
      <div className="w-5 h-5 relative">
        <Image
          src="/images/google.png"
          width={20}
          height={20}
          alt="Google login icon"
        />
      </div>
      <span>Continue with Google</span>
    </button>
  );
}
