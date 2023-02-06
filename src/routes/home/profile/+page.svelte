<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faEdit } from '@fortawesome/free-regular-svg-icons'
  import { page } from '$app/stores'
  import { fetchUser } from '$lib/data'
  import { createQuery } from '@tanstack/svelte-query'
  import Tweet from 'src/components/Tweet.svelte'
  import { CONST } from 'src/constants'
  import type { FullUserProfile } from 'src/types'

  $: profile = $page.data.profile

  const user = createQuery<FullUserProfile, Error>({
    queryKey: [CONST.QUERY_KEYS.user],
    queryFn: () => fetchUser(profile.email)
  })
</script>

<svelte:head>
  <title>{$user.data.name} ({$user.data.handle})</title>
</svelte:head>

{#if $user.status === 'loading'}
  <span>Loading tweets...</span>
{:else if $user.status === 'error'}
  <span>Error: {$user.error.message}</span>
{:else}
  <div class="profile">
    <img class="banner" src={$user.data.banner || '/profile/banner_bg.jpeg'} alt="Profile banner" />
    <img class="avatar" src={$user.data.avatar} alt={$user.data.name} />
    <div class="edit">
      <a class="edit_btn" href="/home/profile/edit" sveltekit:prefetch>
        <Fa size="lg" icon={faEdit} />
        <span>Edit</span>
      </a>
    </div>
  </div>

  <div class="content">
    <div class="user">
      <span class="name">{$user.data.name}</span>
      <span class="handle">{$user.data.handle}</span>
    </div>
    <div class="about">
      <span>About: {$user.data.about}</span>
    </div>
  </div>

  <div class="tweets">
    <p>Tweets: {$user.data.tweets.length || 0}</p>

    {#if $user.data.tweets}
      {#each $user.data.tweets as tweet (tweet.id)}
        <Tweet {tweet} />
      {/each}
    {/if}
  </div>
{/if}

<style lang="scss">
  .profile {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 200px 60px;
  }

  .banner {
    grid-column: 1 / -1;
    grid-row: 1 / 2;
  }

  .avatar {
    grid-column: 1 / 2;
    grid-row: 1 / -1;
    place-self: center;
    align-self: flex-end;
    width: 120px;
    height: 120px;
    margin: 0 var(--spacing-16);
    border-radius: 50%;
    border: 4px solid var(--color-bg-primary);
  }

  .edit {
    grid-column: 4 / -1;
    grid-row: 2 / -1;
    place-self: center;
    align-self: flex-end;
  }

  .edit_btn {
    display: flex;
    align-items: center;

    span {
      margin-left: 5px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content {
    display: grid;
    gap: var(--spacing-16);
    margin-top: var(--spacing-16);
    padding: 0 var(--spacing-16);
  }

  .user {
    display: grid;
  }

  .name {
    font-size: var(--font-24);
    font-weight: 700;
    text-transform: capitalize;
  }

  .handle {
    color: var(--color-text-muted);
  }

  .tweets {
    margin: 15px;
  }
</style>
