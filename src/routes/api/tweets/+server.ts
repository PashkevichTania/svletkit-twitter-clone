import type { RequestHandler } from '@sveltejs/kit'

import {
    createTweet,
    getTweets,
    removeTweet
} from 'src/utils/prisma'

export const GET: RequestHandler = async () => {
    const tweets = await getTweets()

    if (!tweets.length) {
        return new Response('There is no tweets',{
            headers: { 'Content-Type': 'application/json' },
            status: 400,
        })
    }


    return new Response(JSON.stringify(tweets),{
        headers: { 'Content-Type': 'application/json' },
        status: 200,
    })
}

export const POST: RequestHandler = async ({ request }) => {
    let response
    try {
        await createTweet(request)
        response = new Response('Success',{
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        })
    }catch (error) {
        response = new Response(error.message,{
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        })
    }

    return response
}

export const DELETE: RequestHandler = async ({ request }) => {
    await removeTweet(request)

    return new Response('',{
        status: 303,
        headers: { location: '/home' }
    })
}
