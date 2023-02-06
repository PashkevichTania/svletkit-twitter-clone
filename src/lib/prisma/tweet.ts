import { parseCookie } from '$lib/functions'
import prisma from '$lib/prisma/index'
import { error } from '@sveltejs/kit'
import type { TweetType } from 'src/types'

export async function getTweets(request: Request): Promise<TweetType[]> {
  const cookie = request.headers.get('cookie')
  const userId = cookie && +parseCookie(cookie)?.userId

  if (!userId) return []

  const tweets = await prisma.post.findMany({
    include: { author: true, comments: true, likedBy: true },
    orderBy: { createdAt: 'desc' }
  })

  return tweets.map((tweet) => {
    return {
      id: tweet.id,
      url: tweet.url,
      content: tweet.content,
      createdAt: tweet.createdAt,
      author: tweet.author,
      comments: tweet.comments.length,
      likes: tweet.likedBy.length,
      liked: tweet.likedBy.some((user) => user.id === userId)
    }
  })
}

export async function getTweet(
  request: Request,
  params: Record<string, string>
): Promise<TweetType | null> {
  const cookie = request.headers.get('cookie')
  const userId = cookie && +parseCookie(cookie)?.userId

  const tweet = await prisma.post.findFirst({
    where: { url: params.tweetUrl },
    include: {
      author: true,
      likedBy: true,
      comments: {
        include: {
          author: true,
          likedBy: true
        }
      }
    }
  })

  if (!tweet || !userId) return null

  return {
    id: tweet.id,
    url: tweet.url,
    content: tweet.content,
    createdAt: tweet.createdAt,
    author: tweet.author,
    comments: tweet.comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      author: comment.author,
      likes: comment.likedBy.length,
      liked: comment.likedBy.some((user) => user.id === userId)
    })),
    likes: tweet.likedBy.length,
    liked: tweet.likedBy.some((user) => user.id === userId)
  }
}

export async function createTweet(request: Request) {
  const cookie = request.headers.get('cookie')
  const userId = cookie && +parseCookie(cookie)?.userId
  const form = await request.formData()
  const tweet = String(form.get('tweet'))

  if (!userId)
    throw error(400, {
      message: 'No user ID'
    })

  if (!tweet)
    throw error(400, {
      message: 'Tweet is empty'
    })

  if (tweet.length > 140)
    throw error(400, {
      message: 'Maximum Tweet length exceeded.'
    })

  await prisma.post.create({
    data: {
      createdAt: new Date(),
      url: Math.random().toString(16).slice(2),
      content: tweet,
      author: { connect: { id: userId } }
    }
  })
}

export async function removeTweet(request: Request) {
  const params = new URL(request.url).searchParams
  const tweetId = Number(params.get('id'))
  if (!tweetId)
    throw error(400, {
      message: `Tweet with id ${tweetId} not found`
    })

  await prisma.post.delete({ where: { id: tweetId } })
}
