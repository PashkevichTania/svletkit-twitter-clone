<script lang="ts">
  import { fetchUser } from '$lib/data'
  import { createQuery } from '@tanstack/svelte-query'
  import type { FullUserProfile } from 'src/types'
  import { fly } from 'svelte/transition'
  import { CONST, QUERY_KEYS, ROUTES } from 'src/constants'

  import { signIn, signOut } from '@auth/sveltekit/client'

  import { page } from '$app/stores'

  $: sessionUser = $page.data.session?.user
  const user = createQuery<FullUserProfile, Error>({
    queryKey: [QUERY_KEYS.user],
    queryFn: () => fetchUser(sessionUser?.email || '')
  })
</script>

<svelte:head>
  <title>{CONST.title + CONST.icon}</title>
</svelte:head>

<main
  class="container"
  in:fly={{ x: -100, duration: 250, delay: 300 }}
  out:fly={{ x: -100, duration: 250 }}
>
  <section class="hero">
    <h1 class="title">{CONST.title + CONST.icon}</h1>
    <p class="text">Share your cringe takes with everyone.</p>
  </section>

  <section class="login">
    {#if sessionUser}
      <div class="user">
        <div class="user-data">
          <img class="hero" src={$user.data?.avatar || sessionUser.image} alt="user avatar" />
          <h2>{$user.data?.name || sessionUser.name}</h2>
        </div>
        <button class="btn" on:click={() => signOut()}>Sign out</button>
      </div>
      <a class="btn" href={ROUTES.pages.home}>🔥 Share Cringe</a>
    {:else}
      <h2>Please sign in to share cringe</h2>
      <button class="btn" on:click={() => signIn('github')}>Sign In with GitHub</button>
    {/if}
  </section>
</main>

<style>
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 25px;
  }

  .user-data {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 20px;
  }

  .user {
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
  }

  .container {
    height: 100vh;
    display: grid;
  }

  .hero,
  .login {
    display: grid;
    place-content: center;
  }

  .hero {
    background-color: var(--color-brand);
    text-align: center;
  }

  .title {
    font-size: var(--font-80);
    z-index: 2;
  }

  .text {
    padding: var(--spacing-16);
    transform: rotate(2deg) translateY(-40%);
    background: var(--color-bg-primary);
    font-weight: bold;
    font-size: var(--font-24);
    z-index: 1;
  }

  @media (min-width: 1024px) {
    .container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
