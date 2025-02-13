import BlogPostCard from "../components/blog-post-card"
import { GetAllPostsResponse } from "../lib/types"

// Refactor this function to return all posts from the actual API
// fetch('https://dummyjson.com/posts')
// .then(res => res.json())
// .then(console.log);

async function getBlogPosts(): Promise<GetAllPostsResponse> {
    const posts = await fetch('https://dummyjson.com/posts').then(res => res.json())

    return posts;
}

export default async function BlogPage() {
  const postData = await getBlogPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postData.posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

