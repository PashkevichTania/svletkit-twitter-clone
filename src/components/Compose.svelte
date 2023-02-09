<script lang="ts">
  import { fetchUser } from '$lib/data'
  import { QUERY_KEYS, ROUTES } from 'src/constants.js'
  import { enhance } from 'src/lib/form'
  import { page } from '$app/stores'
  import { createQuery, useQueryClient } from '@tanstack/svelte-query'
  import type { FullUserProfile } from 'src/types'

  $: profile = $page.data.profile

  let tweet = ''
  let maxCharacters = 140

  $: charactersLeft = maxCharacters - tweet.length

  const client = useQueryClient()
  const user = createQuery<FullUserProfile, Error>({
    queryKey: [QUERY_KEYS.user],
    queryFn: () => fetchUser(profile.email)
  })
</script>

<div class="compose">
  <img src={$user.data?.avatar || profile.avatar} alt="Avatar" />
  <form
    action={ROUTES.api.tweets}
    method="POST"
    autocomplete="off"
    use:enhance={{
      result: ({ form }) => {
        client.invalidateQueries([QUERY_KEYS.tweets])
        form.reset()
        charactersLeft = 140
      }
    }}
  >
    <input
      aria-label="Enter your Tweet"
      bind:value={tweet}
      name="tweet"
      placeholder="Share something..."
      type="text"
    />
    <button
      class="btn"
      class:error={charactersLeft < 0}
      disabled={charactersLeft <= 0}
      type="submit"
    >
      {charactersLeft === maxCharacters ? 'Tweet' : charactersLeft}
    </button>
  </form>
</div>

<style>
  .compose {
    display: grid;
    grid-template-columns: min-content 1fr;
    align-items: center;
    gap: var(--spacing-16);
    padding: var(--spacing-16) var(--spacing-24);
    border-bottom: 1px solid var(--color-border-primary);
  }

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  form {
    display: flex;
    align-items: center;
    gap: var(--spacing-16);
  }

  input {
    color: var(--color-text-primary);
    background-color: transparent;
  }

  button {
    min-width: 80px;
    font-size: var(--font-16);
    padding: var(--spacing-16);
  }

  .error {
    color: tomato;
  }
</style>
