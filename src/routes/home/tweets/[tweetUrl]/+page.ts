import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, params }) => {
  const response = await fetch(`/home/tweets/${params.tweetUrl}`)

  if (response.status === 200) {
    const tweet = response.json()
    return { tweet }
  }

  throw error(404, 'Not found')
}
