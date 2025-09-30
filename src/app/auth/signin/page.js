import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "../../../../auth";
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default async function SignIp() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="bg-background-secondary">
      <div className="container h-[100vh] mx-auto flex flex-col justify-center items-center">
        <div className="bg-background rounded-md shadow-md w-full md:w-[500px] flex flex-col items-center gap-4 p-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-center">Welcome back</h1>
          </div>

          {/* Google Auth Button */}
          <GoogleAuthButton />

          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form className="w-full flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="input"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="input"
              />
            </div>

            <button
              type="submit"
              className="button focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-600">
              {"Don't have an account? "}
              <Link
                href="/auth/signup"
                className="text-primary hover:underline focus:outline-none cursor-pointer"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
