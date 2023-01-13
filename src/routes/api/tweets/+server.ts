import type { RequestHandler } from '@sveltejs/kit'

import { createTweet, getTweets, removeTweet } from 'src/utils/prisma'
import { getErroMessage } from 'src/utils/error'

export const GET: RequestHandler = async () => {
  const tweets = await getTweets()

  if (!tweets.length) {
    return new Response('There is no tweets', {
      headers: { 'Content-Type': 'application/json' },
      status: 400
    })
  }

  return new Response(JSON.stringify(tweets), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=0, s-maxage=60',
    },
    status: 200
  })
}

export const POST: RequestHandler = async ({ request }) => {
  let response
  try {
    await createTweet(request)
    response = new Response('Success', {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200
    })
  } catch (e) {
    response = new Response(getErroMessage(e), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500
    })
  }

  return response
}

export const DELETE: RequestHandler = async ({ request }) => {
  await removeTweet(request)

  return new Response('Success', {
    status: 200,
  })
}
