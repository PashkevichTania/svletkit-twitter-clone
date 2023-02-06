import { parseCookie } from '$lib/functions'
import prisma from '$lib/prisma/index'
import { error } from '@sveltejs/kit'

export async function createComment(request: Request) {
  const cookie = request.headers.get('cookie')
  const userId = cookie && +parseCookie(cookie)?.userId
  const form = await request.formData()
  const comment = String(form.get('comment'))
  const postId = Number(form.get('tweetId'))

  if (!userId)
    throw error(400, {
      message: 'No user ID'
    })

  if (!comment)
    throw error(400, {
      message: 'Comment is empty'
    })

  if (comment.length > 40)
    throw error(400, {
      message: 'Maximum comment length exceeded.'
    })

  await prisma.comment.create({
    data: {
      createdAt: new Date(),
      content: comment,
      author: { connect: { id: userId } },
      post: { connect: { id: postId } }
    }
  })
}

export async function removeComment(request: Request) {
  const params = new URL(request.url).searchParams
  const id = Number(params.get('id'))
  if (!id)
    throw error(400, {
      message: `Comment with id ${id} not found`
    })

  await prisma.comment.delete({ where: { id: id } })
}
