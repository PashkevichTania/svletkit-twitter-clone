import type { PageLoad } from './$types'

import type { TweetType } from 'src/types'

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch('/api/tweets/')
  const tweets: TweetType[] = response.status === 200 ? await response.json() : []

  return { tweets }
}
