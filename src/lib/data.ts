import { PUBLIC_BASE_URL } from '$env/static/public'
import type { TweetType } from 'src/types'

export const fetchTweets = async () => {
  const response = await fetch(`${PUBLIC_BASE_URL}/api/tweets/`)
  const tweets: TweetType[] = response.status === 200 ? await response.json() : []

  return tweets
}
