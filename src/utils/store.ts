import type { UserProfile } from 'src/types'
import { writable } from 'svelte/store'

export const userStore = writable<UserProfile | null>(null)
