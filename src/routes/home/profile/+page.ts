import { CONST } from 'src/constants'
import type { PageLoad } from './$types'
import { fetchUser } from 'src/lib/data'

export const load: PageLoad = async ({ parent }) => {
  const { profile, queryClient } = await parent()

  if (profile?.email)
    await queryClient.prefetchQuery({
      queryKey: [CONST.QUERY_KEYS.user],
      queryFn: () => fetchUser(profile.email)
    })
}
