import { PUBLIC_BASE_URL } from '$env/static/public'
import type { FullUserProfile, TweetType } from 'src/types'

export const fetchTweets = async () => {
  const response = await fetch(`${PUBLIC_BASE_URL}/api/tweets/`)
  const tweets: TweetType[] = response.status === 200 ? await response.json() : []

  return tweets
}

export const fetchUser = async (email: string): Promise<FullUserProfile | null> => {
  const response = await fetch(`${PUBLIC_BASE_URL}/api/user/?email=${email}`)
  const user: FullUserProfile = response.status === 200 ? await response.json() : null

  return user
}
