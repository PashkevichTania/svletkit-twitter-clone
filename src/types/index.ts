import type { User } from "@prisma/client"

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

export type UserProfile = { 
  profile: User
  tweets: TweetType[]
 }