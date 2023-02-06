import { omit, parseCookie, timePosted } from '$lib/functions'
import prisma from '$lib/prisma/index'
import type { User } from '@prisma/client'
import type { FullUserProfile, GithubUserProfile, UserProfile } from 'src/types'

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

  return await prisma.user.update({
    where: { id: userId },
    data: data
  })
}
