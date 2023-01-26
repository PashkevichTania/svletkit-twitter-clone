import { browser } from '$app/environment'
import { QueryClient } from '@tanstack/svelte-query'
import type { LayoutLoad } from '../../.svelte-kit/types/src/routes/$types'

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

  return { queryClient, session, profile }
}
