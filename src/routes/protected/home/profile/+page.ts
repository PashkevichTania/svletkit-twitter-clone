import { QUERY_KEYS } from 'src/constants'
import type { PageLoad } from './$types'
import { fetchUser } from '$lib/data'

export const load: PageLoad = async ({ parent }) => {
  const { profile, queryClient } = await parent()

  if (profile?.email)
    await queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.user],
      queryFn: () => fetchUser(profile.email)
    })
}
