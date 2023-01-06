import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export function randomUrl(): string {
  return Math.random().toString(16).slice(2)
}

// gets random time starting from now and
// going back one day whenever you seed the
// database in the future
export function randomDate(): string {
  // this is set to one day
  const offset = 24 * 60 * 60 * 1000

  const current = new Date().getTime()
  const random = Math.random() * offset
  const difference = new Date(current - random)

  return difference.toISOString()
}

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
            url: randomUrl(),
            posted: randomDate(),
            content: `SvelteKit is lit. 🔥`,
            likes: 10
          },
          {
            url: randomUrl(),
            posted: randomDate(),
            content: `I love Svelte! ❤️`,
            likes: 24
          },
          {
            url: randomUrl(),
            posted: randomDate(),
            content: ` Amet nisl purus in mollis nunc sed.`,
            likes: 0
          },
          {
            url: randomUrl(),
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
            url: randomUrl(),
            posted: randomDate(),
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
            likes: 1
          },
          {
            url: randomUrl(),
            posted: randomDate(),
            content: ` Mattis aliquam faucibus purus in massa tempor nec feugiat nisl.`,
            likes: 4
          },
          {
            url: randomUrl(),
            posted: randomDate(),
            content:
              'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
            likes: 0
          },
          {
            url: randomUrl(),
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
