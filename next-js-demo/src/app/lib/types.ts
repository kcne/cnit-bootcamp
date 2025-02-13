export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  coverImage: string
}


export interface GetAllPostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reactions
  views: number
  userId: number
}

export interface Reactions {
  likes: number
  dislikes: number
}


export interface GetSinglePostResponse {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: Reactions
  views: number
  userId: number
}
