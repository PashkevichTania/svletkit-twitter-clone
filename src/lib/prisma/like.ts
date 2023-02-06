import { parseCookie } from '$lib/functions'
import prisma from '$lib/prisma/index'
import { error } from '@sveltejs/kit'

async function like(request: Request, type: 'tweet' | 'comment') {
  const cookie = request.headers.get('cookie')
  const userId = cookie && +parseCookie(cookie)?.userId
  const prismaTable: any = type === 'tweet' ? prisma.post : prisma.comment
  const form = await request.formData()
  const instanceIdType = type === 'tweet' ? 'tweetId' : 'commentId'
  const instanceId = Number(form.get(instanceIdType))

  if (!instanceId || !userId)
    throw error(400, {
      message: !userId ? 'No userId' : `No ${instanceIdType}`
    })

  const instance = await prismaTable.findUnique({
    where: { id: instanceId },
    include: { likedBy: true }
  })

  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!instance || !user)
    throw error(400, {
      message: `${type} with id ${instanceId} not found`
    })

  // verify if tweet is already liked
  const liked = instance.likedBy.some((user: { id: number }) => user.id === userId)
  const likedCopy = instance.likedBy

  if (liked) {
    // if tweet is already liked unlike it
    return await prismaTable.update({
      where: { id: instanceId },
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

  return await prismaTable.update({
    where: { id: instanceId },
    data: {
      likedBy: {
        connect: {
          id: userId
        }
      }
    }
  })
}

export async function likeTweet(request: Request) {
  return like(request, 'tweet')
}

export async function likeComment(request: Request) {
  return like(request, 'comment')
}
