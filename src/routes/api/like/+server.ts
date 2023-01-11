import type { RequestHandler } from '@sveltejs/kit'

import { likeTweet } from 'src/utils/prisma'
import { getErroMessage } from 'src/utils/error'

export const POST: RequestHandler = async ({ request }) => {
  let response
  try {
    await likeTweet(request)
    response = new Response('Success', {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (e) {
    response = new Response(getErroMessage(e), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    })
  }

  return response
}
