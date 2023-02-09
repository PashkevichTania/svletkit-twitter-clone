import { fetchTweet } from '$lib/data'
import { QUERY_KEYS } from 'src/constants'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, parent }) => {
  const { queryClient } = await parent()

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.tweets, params.tweetUrl],
    queryFn: () => fetchTweet(params.tweetUrl)
  })
}
