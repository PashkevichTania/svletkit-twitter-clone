import type { LayoutServerLoad } from './$types'
import { getUserProfile } from 'src/utils/prisma'
import type { GithubUserProfile } from 'src/types'

export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.getSession()
  const githubProfile: GithubUserProfile | null = session
    ? (session.user as GithubUserProfile)
    : null

  const profile = await getUserProfile(githubProfile)
  return {
    session,
    profile
  }
}
