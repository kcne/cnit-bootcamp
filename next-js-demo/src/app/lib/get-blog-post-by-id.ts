"use server"
import { BlogPost } from "./types";



// Refactor to make an actual call to the API
// fetch('https://dummyjson.com/posts/1')
// .then(res => res.json())
// .then(console.log);

export async function getBlogPostById(id:string): Promise<BlogPost | undefined> {
  // In a real application, you would fetch this data from an API or database
  // For this example, we'll use mock data

   const blogPosts = [
    {
      id: "1",
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build modern web applications with Next.js",
      date: "2023-05-01",
      author: "John Doe",
      coverImage: "https://picsum.photos/seed/1/400/600",
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
    const post = blogPosts.find(blogPost => blogPost.id==id);

    return post;
}
