import { fetchTweet } from '$lib/data'
import { CONST } from 'src/constants'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params, parent }) => {
  const { queryClient } = await parent()

  await queryClient.prefetchQuery({
    queryKey: [CONST.QUERY_KEYS.tweets, params.tweetUrl],
    queryFn: () => fetchTweet(params.tweetUrl)
  })
}
