import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-2 min-h-screen">
      <h1 className="text-3xl">Home page</h1>
      <Link href={"/auth/signin"}>
        <button className="button w-72">Click Here to get started</button>
      </Link>
    </div>
  );
}
