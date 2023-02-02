import type { RequestHandler } from '@sveltejs/kit'
import { getUserProfile } from 'src/utils/prisma'
import { getErroMessage } from 'src/utils/error'

export const GET: RequestHandler = async ({ request }) => {
  const user = await getUserProfile(request)

  return new Response(JSON.stringify(user), {
    headers: {
      'Content-Type': 'application/json'
    },
    status: 200
  })
}

export const POST: RequestHandler = async ({ request }) => {
  let response
  try {
    // await createTweet(request)
    response = new Response('Success', {
      headers: {
        'Content-Type': 'application/json'
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
