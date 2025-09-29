import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-background-secondary">
      <div className="container h-[100vh] flex flex-col justify-center items-center gap-6">
        <h1 className="text-2xl font-bold text-center">SaleTracker</h1>
        <div className="bg-background rounded-md shadow-md w-full md:w-[500px] flex flex-col items-center gap-6 p-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-center">Welcome back</h1>
            <p className="text-gray-500 text-center font-light">
              Login to access your dashboard.
            </p>
          </div>
          <button className="border w-full border-gray-200 rounded-md px-4 py-2 shadow-md cursor-pointer hover:bg-background-secondary flex items-center justify-center gap-2">
            <div className="w-5">
              <Image
                src="/images/google.png"
                width={512}
                height={512}
                alt="Google login icon"
                priority
              />
            </div>
            <span>Login with Google</span>
          </button>
        </div>
        <p className="text-center">
          By logging in, you agree to our
          <br />
          <span className="text-primary cursor-pointer">Terms of Service.</span>
        </p>
      </div>
    </div>
  );
}
