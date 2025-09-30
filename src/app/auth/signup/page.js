import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "../../../../auth"
import GoogleAuthButton from "@/components/GoogleAuthButton";

export default async function SignUp() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="bg-background-secondary">
      <div className="container h-[100vh] mx-auto flex flex-col justify-center items-center">
        <div className="bg-background rounded-md shadow-md w-full md:w-[500px] flex flex-col items-center gap-4 p-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-center">Create account</h1>
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  className="input"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  className="input"
                />
              </div>
            </div>

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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="input"
              />
            </div>

            <button
              type="submit"
              className="button focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Create Account
            </button>
          </form>

          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?
              <Link
                className="text-primary hover:underline focus:outline-none cursor-pointer"
                href="/auth/signin"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
