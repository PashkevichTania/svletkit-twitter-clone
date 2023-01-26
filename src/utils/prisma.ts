import prisma from '$lib/prisma'
import { parseCookie, timePosted } from 'src/utils/functions'
import { error } from '@sveltejs/kit'
import type { GithubUserProfile, TweetType, UserProfile } from 'src/types'
import { User } from '@prisma/client'

export async function getTweets(request: Request): Promise<TweetType[]> {
  const cookie = request.headers.get('cookie')
  const userId = (cookie && +parseCookie(cookie)?.userId) || 1

  const tweets = await prisma.tweet.findMany({
    include: { user: true },
    orderBy: { posted: 'desc' }
  })

  const likedTweets = await getLikedTweets(userId)

  return tweets.map((tweet) => {
    return {
      id: tweet.id,
      content: tweet.content,
      likes: tweet.likes,
      posted: timePosted(tweet.posted),
      url: tweet.url,
      avatar: tweet.user.avatar,
      handle: tweet.user.handle,
      name: tweet.user.name,
      liked: likedTweets.includes(tweet.id)
    }
  })
}

export async function getTweet(
  request: Request,
  params: Record<string, string>
): Promise<TweetType | null> {
  const cookie = request.headers.get('cookie')
  const userId = (cookie && +parseCookie(cookie)?.userId) || 1

  const tweet = await prisma.tweet.findFirst({
    where: { url: params.tweetId },
    include: { user: true }
  })

  const likedTweets = await getLikedTweets(userId)

  if (!tweet) return null
  return {
    id: tweet.id,
    content: tweet.content,
    likes: tweet.likes,
    posted: timePosted(tweet.posted),
    url: tweet.url,
    avatar: tweet.user.avatar,
    handle: tweet.user.handle,
    name: tweet.user.name,
    liked: likedTweets.includes(tweet.id)
  }
}

export async function getLikedTweets(userId = 1) {
  const liked = await prisma.liked.findMany({
    where: { userId: userId },
    select: { tweetId: true }
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Object.keys(liked).map((key) => liked[key].tweetId)
}

export async function createTweet(request: Request) {
  const form = await request.formData()
  const tweet = String(form.get('tweet'))
  const userId = Number(form.get('userId'))

  if (!tweet)
    throw error(400, {
      message: 'Tweet is empty'
    })

  if (tweet.length > 140)
    throw error(400, {
      message: 'Maximum Tweet length exceeded.'
    })

  // you can get the user from the session
  await prisma.tweet.create({
    data: {
      posted: new Date(),
      url: Math.random().toString(16).slice(2),
      content: tweet,
      likes: 0,
      user: { connect: { id: userId || 1 } }
    }
  })
}

export async function removeTweet(request: Request) {
  const params = new URL(request.url).searchParams
  const tweetId = +(params.get('id') || 1)
  await prisma.tweet.delete({ where: { id: tweetId } })
}

export async function likeTweet(request: Request) {
  const form = await request.formData()
  const tweetId = +(form.get('tweetId') || 1)
  const userId = +(form.get('userId') || 1)

  // verify if tweet is already liked
  const liked = await prisma.liked.count({
    where: { tweetId }
  })

  if (liked === 1) {
    // if tweet is already liked unlike it
    await prisma.liked.delete({ where: { tweetId } })

    // update the likes count
    const count = (await prisma.tweet.findUnique({
      where: { id: tweetId },
      select: { likes: true }
    })) || { likes: 0 }

    await prisma.tweet.update({
      where: { id: tweetId },
      data: { likes: (count.likes -= 1) }
    })

    return
  }

  // add liked record
  await prisma.liked.create({
    data: {
      tweetId,
      user: { connect: { id: userId } }
    }
  })

  // get the current like count and update it
  const count = (await prisma.tweet.findUnique({
    where: { id: tweetId },
    select: { likes: true }
  })) || { likes: 0 }

  await prisma.tweet.update({
    where: { id: tweetId },
    data: { likes: (count.likes += 1) }
  })
}

export async function getUserProfile(
  params: GithubUserProfile | null
): Promise<UserProfile | null> {
  if (!params?.name || !params?.email) return null

  let profile = await prisma.user.findFirst({
    where: { name: params.name }
  })

  if (!profile) {
    profile = await prisma.user.create({
      data: {
        name: params.name,
        handle: '@' + params.name,
        email: params.email,
        avatar: params?.image || '/profile/avatar.svg',
        about: '',
        tweets: {
          create: []
        }
      }
    })
  }

  const tweets = await prisma.tweet.findMany({
    where: { user: { id: profile.id } },
    include: { user: true },
    orderBy: { posted: 'desc' }
  })

  const likedTweets = await getLikedTweets(profile.id)

  const userTweets: TweetType[] = tweets.map((tweet) => {
    return {
      id: tweet.id,
      content: tweet.content,
      likes: tweet.likes,
      posted: timePosted(tweet.posted),
      url: tweet.url,
      avatar: tweet.user.avatar,
      handle: tweet.user.handle,
      name: tweet.user.name,
      liked: likedTweets.includes(tweet.id)
    }
  })

  return { ...profile, tweets: userTweets }
}

export async function editUserProfile(id: number, data: Partial<User>): Promise<User> {
  return await prisma.user.update({
    where: { id },
    data: data
  })
}
