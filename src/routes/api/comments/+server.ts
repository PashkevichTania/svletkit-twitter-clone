import type { RequestHandler } from '@sveltejs/kit'

import { createComment, removeComment } from '$lib/prisma/comment'
import { getErroMessage } from '$lib/error'

export const POST: RequestHandler = async ({ request }) => {
  let response
  try {
    await createComment(request)
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

export const DELETE: RequestHandler = async ({ request }) => {
  await removeComment(request)

  return new Response('Success', {
    status: 200
  })
}
