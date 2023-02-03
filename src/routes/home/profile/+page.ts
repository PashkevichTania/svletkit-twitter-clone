import type { PageLoad } from '.svelte-kit/types/src/routes/home/$types'
import { fetchUserTweets } from '$lib/data'
import { CONST } from 'src/constants'

export const load: PageLoad = async ({ parent }) => {
  const { queryClient } = await parent()

  await queryClient.prefetchQuery({
    queryKey: [CONST.QUERY_KEYS.userTweets],
    queryFn: () => fetchUserTweets()
  })
}
