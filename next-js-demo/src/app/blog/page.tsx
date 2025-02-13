import BlogPostCard from "../components/blog-post-card"
import { BlogPost } from "../lib/types"


async function getBlogPosts(): Promise<BlogPost[]> {
  // In a real application, you would fetch this data from an API or database
  // For this example, we'll use mock data
  return [
    {
      id: "1",
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build modern web applications with Next.js",
      date: "2023-05-01",
      author: "John Doe",
      coverImage: "https://picsum.photos/seed/1/200/300",
    },
    {
      id: "2",
      title: "Mastering Tailwind CSS",
      excerpt: "Discover the power of utility-first CSS with Tailwind",
      date: "2023-05-15",
      author: "Jane Smith",
      coverImage: "https://picsum.photos/seed/2/400/600",
    },
    {
      id: "3",
      title: "The Future of Web Development",
      excerpt: "Exploring upcoming trends in web development",
      date: "2023-06-01",
      author: "Alex Johnson",
      coverImage: "https://picsum.photos/seed/3/400/600",
    },
    {
      id: "4",
      title: "Building Accessible Websites",
      excerpt: "Best practices for creating inclusive web experiences",
      date: "2023-06-15",
      author: "Emily Brown",
      coverImage: "https://picsum.photos/seed/4/400/600",
    }
  ]
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

