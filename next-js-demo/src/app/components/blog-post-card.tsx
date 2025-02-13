import Image from "next/image"
import Link from "next/link"
import { BlogPost } from "../lib/types"

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden">
      <Image
        src={post.coverImage || "/placeholder.svg"}
        alt={post.title}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>{post.author}</span>
          <span>{post.date}</span>
        </div>
        <Link href={`/blog/${post.id}`} className="mt-4 inline-block text-primary hover:underline">
          Read more
        </Link>
      </div>
    </div>
  )
}

