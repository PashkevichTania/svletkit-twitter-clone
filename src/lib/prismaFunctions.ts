import type { User } from '@prisma/client'
import prisma from '$lib/prisma'
import { omit, parseCookie, timePosted } from '$lib/functions'
import { error } from '@sveltejs/kit'
import type { FullUserProfile, GithubUserProfile, TweetType, UserProfile } from 'src/types'

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
      createdAt: timePosted(tweet.createdAt),
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
    createdAt: timePosted(tweet.createdAt),
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
  const form = await request.formData()
  const tweet = String(form.get('tweet'))
  const userId = Number(form.get('userId'))

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

export async function likeTweet(request: Request) {
  const form = await request.formData()
  const tweetId = Number(form.get('tweetId'))
  const userId = Number(form.get('userId'))

  if (!tweetId || !userId)
    throw error(400, {
      message: !userId ? 'No userId' : 'No tweetId'
    })

  const tweet = await prisma.post.findUnique({
    where: { id: tweetId },
    include: { likedBy: true }
  })

  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!tweet || !user)
    throw error(400, {
      message: `Tweet with id ${tweetId} not found`
    })

  // verify if tweet is already liked
  const liked = tweet.likedBy.some((user) => user.id === userId)
  const likedCopy = tweet.likedBy

  if (liked) {
    // if tweet is already liked unlike it
    return await prisma.post.update({
      where: { id: tweetId },
      data: {
        likedBy: {
          disconnect: {
            id: userId
          }
        }
      }
    })
  }

  likedCopy.push(user)

  return await prisma.post.update({
    where: { id: tweetId },
    data: {
      likedBy: {
        connect: {
          id: userId
        }
      }
    }
  })
}

export const getUserProfileInitial = async (
  params: GithubUserProfile | null
): Promise<UserProfile | null> => {
  if (!params?.name || !params?.email) return null

  let profile = await prisma.user.findUnique({
    where: { email: params.email }
  })

  if (!profile) {
    profile = await prisma.user.create({
      data: {
        name: params.name,
        handle: '@' + params.name,
        email: params.email,
        avatar: params?.image || '/profile/avatar.svg',
        banner: '',
        about: ''
      }
    })
  }

  return { ...profile }
}

export async function getUserProfile(request: Request): Promise<FullUserProfile | null> {
  const params = new URL(request.url).searchParams
  const email = params.get('email')
  if (!email) return null

  const profile = await prisma.user.findUnique({
    where: { email: email },
    include: {
      posts: {
        include: {
          author: true,
          likedBy: true,
          comments: true
        }
      }
    }
  })

  if (!profile) return null

  const tweets = profile.posts.map((tweet) => ({
    id: tweet.id,
    url: tweet.url,
    content: tweet.content,
    createdAt: timePosted(tweet.createdAt),
    author: tweet.author,
    comments: tweet.comments.length,
    likes: tweet.likedBy.length,
    liked: tweet.likedBy.some((user) => user.id === profile.id)
  }))

  const user = omit(profile, 'posts') as UserProfile

  return { ...user, tweets }
}

export async function editUserProfile(request: Request): Promise<User> {
  const cookie = request.headers.get('cookie')
  const userId = (cookie && +parseCookie(cookie)?.userId) || 1
  const form = await request.formData()
  const data = Object.fromEntries(form.entries())

  console.debug('user', data)

  return await prisma.user.update({
    where: { id: userId },
    data: data
  })
}
