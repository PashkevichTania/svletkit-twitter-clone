import { PUBLIC_BASE_URL } from '$env/static/public'
import type { FullUserProfile, TweetType } from 'src/types'

export const fetchTweets = async (): Promise<TweetType[]> => {
  const response = await fetch(`${PUBLIC_BASE_URL}/protected/api/tweets/`)
  return response.status === 200 ? await response.json() : []
}

export const fetchUser = async (email: string): Promise<FullUserProfile | null> => {
  const response = await fetch(`${PUBLIC_BASE_URL}/protected/api/user/?email=${email}`)
  return response.status === 200 ? await response.json() : null
}

export const fetchTweet = async (tweetUrl: string): Promise<FullUserProfile | null> => {
  const response = await fetch(`${PUBLIC_BASE_URL}/protected/home/tweets/${tweetUrl}`)
  return response.status === 200 ? await response.json() : null
}
