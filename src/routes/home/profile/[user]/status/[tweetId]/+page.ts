import type { RequestHandler } from '@sveltejs/kit'

import { getTweet } from 'src/utils/prisma'

export const get: RequestHandler = async ({ request, params }) => {
  const tweet = await getTweet(request, params)

  if (!tweet) {
    return { status: 400 }
  }

  return {
    status: 200,
    body: { tweet }
  }
}
