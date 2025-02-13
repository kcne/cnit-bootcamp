import { getBlogPostById } from '@/app/lib/get-blog-post-by-id';
import React from 'react'
import { notFound } from 'next/navigation'
import Image from "next/image";



// Refactor to make an actual call to the API
// fetch('https://dummyjson.com/posts/1')
// .then(res => res.json())
// .then(console.log);
async function GetBlogPostById(id:string){
// Insert code here
}

async function PostPage({params}) {
    const id = params.id;

    const post = await getBlogPostById(id);

    if(!post){
        notFound()
    }

  return (
    <div className=' w-screen'>
        <h1>{post.title}</h1>
        <Image src={post.coverImage??""} alt="Cover Page" width={300} height={200}/>
        <p>{post.excerpt}</p>
        <p className="text-gray-800">{post.date}</p>
        <p className="text-gray-800">{post.author}</p>
    </div>
  )
}

export default PostPage

