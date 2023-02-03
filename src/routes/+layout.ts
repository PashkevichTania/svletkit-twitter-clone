import { browser } from '$app/environment'
import { fetchUser } from '$lib/data'
import { QueryClient } from '@tanstack/svelte-query'
import { CONST } from 'src/constants'
import type { LayoutLoad } from '.svelte-kit/types/src/routes/$types'

export const load: LayoutLoad = async (event) => {
  const { session, profile } = event.data
  if (browser) {
    document.cookie = `userId=${profile?.id || 1}`
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser
      }
    }
  })
  if (profile?.email)
    await queryClient.prefetchQuery({
      queryKey: [CONST.QUERY_KEYS.user],
      queryFn: () => fetchUser(profile.email)
    })

  return { queryClient, session, profile }
}
