import Link from "next/link";


export default async function Home() {

    await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div>
     <Link href='/blog' className="hover:underline">Go to blog</Link>
    </div>
  );
}
