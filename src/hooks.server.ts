import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, SECRET } from '$env/static/private'

import { SvelteKitAuth } from '@auth/sveltekit'
import GitHub from '@auth/core/providers/github'
import type { Handle, RequestEvent, ResolveOptions } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import type { MaybePromise } from '@sveltejs/kit/types/private'

interface Params {
  event: RequestEvent
  resolve(event: RequestEvent, opts?: ResolveOptions): MaybePromise<Response>
}

async function authorization({ event, resolve }: Params) {
  // Protect any routes under /protected
  if (event.url.pathname.startsWith('/protected')) {
    const session = await event.locals.getSession()
    if (!session) {
      throw redirect(303, '/')
    }
  }

  // If the request is still here, just proceed as normally
  return await resolve(event, {
    transformPageChunk: ({ html }) => html
  })
}

// First handle authentication, then authorization
// Each function acts as a middleware, receiving the request handle
// And returning a handle which gets passed to the next function
export const handle: Handle = sequence(
  SvelteKitAuth({
    secret: SECRET,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    providers: [GitHub({ clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET })]
  }),
  authorization
)
