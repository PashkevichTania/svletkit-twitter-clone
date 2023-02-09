import type { RequestHandler } from '@sveltejs/kit'
import { editUserProfile, getUserProfile } from '$lib/prisma/user'
import { getErroMessage } from '$lib/error'

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
    await editUserProfile(request)
    response = new Response('Success', {
      headers: {
        Location: '/protected/home/profile'
      },
      status: 302
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
