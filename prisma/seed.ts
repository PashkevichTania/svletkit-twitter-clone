import { PrismaClient } from '@prisma/client'
import { generateUUID, randomDate } from '../src/utils/functions'

const prisma = new PrismaClient()

function getUsers() {
  return [
    {
      name: 'matia',
      handle: '@joyofcodedev',
      email: 'matia@example.test',
      avatar: '/profile/matia/avatar.webp',
      about: 'Likes long walks on the beach.',
      tweets: {
        create: [
          {
            url: generateUUID(),
            posted: randomDate(),
            content: `SvelteKit is lit. 🔥`,
            likes: 10
          },
          {
            url: generateUUID(),
            posted: randomDate(),
            content: `I love Svelte! ❤️`,
            likes: 24
          },
          {
            url: generateUUID(),
            posted: randomDate(),
            content: ` Amet nisl purus in mollis nunc sed.`,
            likes: 0
          },
          {
            url: generateUUID(),
            posted: randomDate(),
            content: `Enim facilisis gravida neque convallis a cras. Sed sed risus pretium quam vulputate.`,
            likes: 0
          }
        ]
      }
    },
    {
      name: 'bob',
      handle: '@bobross',
      email: 'bob@example.test',
      avatar: '/profile/bob/avatar.webp',
      about: 'Likes painting.',
      tweets: {
        create: [
          {
            url: generateUUID(),
            posted: randomDate(),
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
            likes: 1
          },
          {
            url: generateUUID(),
            posted: randomDate(),
            content: ` Mattis aliquam faucibus purus in massa tempor nec feugiat nisl.`,
            likes: 4
          },
          {
            url: generateUUID(),
            posted: randomDate(),
            content:
              'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
            likes: 0
          },
          {
            url: generateUUID(),
            posted: randomDate(),
            content: 'Euismod elementum nisi quis eleifend quam. 🌈',
            likes: 10
          }
        ]
      }
    }
  ]
}

async function seed() {
  const users = getUsers()

  for (const user of users) {
    await prisma.user.create({ data: user })
  }
}

seed()
