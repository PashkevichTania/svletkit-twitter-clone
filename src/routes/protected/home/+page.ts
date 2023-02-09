import { QUERY_KEYS } from 'src/constants'
import type { PageLoad } from './$types'
import { fetchTweets } from '$lib/data'

export const load: PageLoad = async ({ parent }) => {
  const { queryClient } = await parent()

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.tweets],
    queryFn: () => fetchTweets()
  })
}
