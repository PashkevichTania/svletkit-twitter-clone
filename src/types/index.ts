import type { User, Comment } from '@prisma/client'

export type UserProfile = User

export type FullUserProfile = User & { tweets: TweetType[] }

export type TweetType = {
  id: number
  url: string
  content: string
  createdAt: string
  author: UserProfile
  comments: Comment[]
  likes: number
  liked: boolean
}

export type GithubUserProfile = {
  name?: string
  email?: string
  image?: string
}
