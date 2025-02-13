import Link from "next/link";

export default function Home() {
  return (
    <div>
     <Link href='/blog' className="hover:underline">Go to blog</Link>
    </div>
  );
}
