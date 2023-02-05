import type { User, Comment as PrismaComment } from '@prisma/client'

export type UserProfile = User

export type Comment = Omit<PrismaComment, 'postId' | 'authorId'> & {
  author: UserProfile
  likes: number
  liked: boolean
}

export type FullUserProfile = User & { tweets: TweetType[] }

export type TweetType = {
  id: number
  url: string
  content: string
  createdAt: string
  author: UserProfile
  //FIXME:
  comments: number | Comment[]
  likes: number
  liked: boolean
}

export type GithubUserProfile = {
  name?: string
  email?: string
  image?: string
}
