import type { User } from '@prisma/client'

export type TweetType = {
  id: number
  content: string
  likes: number
  posted: string
  url: string
  avatar: string
  handle: string
  name: string
  liked: boolean
}

export type UserProfile = User & {
  tweets: TweetType[]
}

export type GithubUserProfile = {
  name?: string
  email?: string
  image?: string
}
