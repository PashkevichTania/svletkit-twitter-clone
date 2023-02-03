# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

created by tutotial: https://joyofcode.xyz/sveltekit-for-beginners

https://youtube.com/playlist?list=PLA9WiRZ-IS_zXZZyW4qfj0akvOAtk6MFS

[TanStack Query Svelte](https://tanstack.com/query/v4/docs/svelte/overview)
Import from:
'@sveltestack/svelte-query' -> '@tanstack/svelte-query'
Renamed functions:
useQuery -> createQuery
useQueries -> createQueries
useMutation -> createMutation

1. npx prisma init (create prisma folder) 
2. npx prisma generate (generates assets like Prisma Client)
3. npx prisma db push (pushes the state of your Prisma schema file to the database without using migrations. It creates the database if the database does not exist.)
4. npx prisma db seed (adds data to DB)
5. npx prisma studio (check DB in browser)