import React from 'react'
import { GetAllPostsResponse } from '../lib/types';
import BlogPostCard from './blog-post-card';


async function getBlogPosts(): Promise<GetAllPostsResponse> {
    const posts = await fetch('https://dummyjson.com/posts').then(res => res.json())
    return posts;
}

async function ReadMore(){

const postData = await getBlogPosts()

  return (
    <div>
        <div className='text-4xl py-5'>Read more...</div>
        <div className="flex gap-3 w-[1000px]">
                  {postData.posts.reverse().slice(0,3).map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
        </div>
    </div>

  )
}

export default ReadMore