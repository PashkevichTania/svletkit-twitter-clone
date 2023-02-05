import type { RequestHandler } from '@sveltejs/kit'
import { getTweet } from '$lib/prismaFunctions'

export const GET: RequestHandler = async ({ request, params }) => {
  const tweet = await getTweet(request, params as Record<string, string>)

  if (!tweet) {
    return new Response(`There is no tweet with url ${params.url}`, {
      headers: { 'Content-Type': 'application/json' },
      status: 400
    })
  }

  return new Response(JSON.stringify(tweet), {
    headers: {
      'Content-Type': 'application/json'
    },
    status: 200
  })
}
