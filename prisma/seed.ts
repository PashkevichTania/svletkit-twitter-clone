import { PrismaClient } from '@prisma/client'

const generateUUID = (): string => Math.random().toString(16).slice(2)
// gets random time starting from now and
// going back one day whenever you seed the
// database in the future
function randomDate(): string {
  // this is set to one day
  const offset = 24 * 60 * 60 * 1000

  const current = new Date().getTime()
  const random = Math.random() * offset
  const difference = new Date(current - random)

  return difference.toISOString()
}

const prisma = new PrismaClient()

function getUsers() {
  return [
    {
      name: 'matia',
      handle: '@joyofcodedev',
      email: 'matia@example.test',
      avatar: '/profile/matia/avatar.webp',
      banner: '/profile/matia/banner.webp',
      about: 'Likes long walks on the beach.',
      posts: {
        create: [
          {
            url: generateUUID(),
            createdAt: randomDate(),
            content: `SLAY 💅🌈`
          },
          {
            url: generateUUID(),
            createdAt: randomDate(),
            content: `SvelteKit is lit. 🔥`
          },
          {
            url: generateUUID(),
            createdAt: randomDate(),
            content: `I love Svelte! ❤️`
          },
          {
            url: generateUUID(),
            createdAt: randomDate(),
            content: ` Amet nisl purus in mollis nunc sed.`
          },
          {
            url: generateUUID(),
            createdAt: randomDate(),
            content: `Enim facilisis gravida neque convallis a cras. Sed sed risus pretium quam vulputate.`
          }
        ]
      }
    },
    {
      name: 'bob',
      handle: '@bobross',
      email: 'bob@example.test',
      avatar: '/profile/bob/avatar.webp',
      banner: '/profile/bob/banner.webp',
      about: 'Likes painting.',
      posts: {
        create: [
          {
            url: generateUUID(),
            createdAt: randomDate(),
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
          },
          {
            url: generateUUID(),
            createdAt: randomDate(),
            content: ` Mattis aliquam faucibus purus in massa tempor nec feugiat nisl.`
          },
          {
            url: generateUUID(),
            createdAt: randomDate(),
            content:
              'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit'
          },
          {
            url: generateUUID(),
            createdAt: randomDate(),
            content: 'Euismod elementum nisi quis eleifend quam. 🌈'
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
  //Like all post by first user
  await prisma.user.update({
    where: { id: 1 },
    data: {
      likedPosts: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 }
        ]
      }
    }
  })
  //Like some post by second user
  await prisma.user.update({
    where: { id: 2 },
    data: { likedPosts: { connect: [{ id: 2 }, { id: 4 }, { id: 3 }, { id: 5 }, { id: 9 }] } }
  })
}

seed()
