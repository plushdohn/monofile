import Link from "next/link";

export default function UnknownPage() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-gray-600">
      <span className="text-6xl mb-8 font-bold">:(</span>
      <span className="text-center font-semibold">
        This page doesn't exist. <br /> Click{" "}
        <Link href="/" passHref>
          <a className="font-bold hover:underline focus:underline">here</a>
        </Link>{" "}
        to go to the home page.
      </span>
    </div>
  );
}
