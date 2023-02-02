import { CONST } from 'src/constants'
import type { PageLoad } from './$types'
import { fetchTweets } from 'src/lib/data'

export const load: PageLoad = async ({ parent }) => {
  const { queryClient } = await parent()

  await queryClient.prefetchQuery({
    queryKey: [CONST.QUERY_KEYS.tweets],
    queryFn: () => fetchTweets()
  })
}
