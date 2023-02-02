import type { RequestHandler } from '@sveltejs/kit'
import { getUserTweets } from 'src/utils/prisma'

export const GET: RequestHandler = async ({ request }) => {
  const { tweets } = await getUserTweets(request)

  if (!tweets.length) {
    return new Response('There is no tweets', {
      headers: { 'Content-Type': 'application/json' },
      status: 400
    })
  }

  return new Response(JSON.stringify(tweets), {
    headers: {
      'Content-Type': 'application/json'
    },
    status: 200
  })
}
