import type { RequestHandler } from '@sveltejs/kit'

import { likeTweet } from 'src/utils/prisma'

export const POST: RequestHandler = async ({ request }) => {
    await likeTweet(request)

    return new Response('')
}
