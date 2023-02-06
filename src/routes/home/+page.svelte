<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query'
  import Compose from 'src/components/Compose.svelte'
  import Tweet from 'src/components/Tweet.svelte'
  import { CONST } from 'src/constants'
  import type { TweetType } from 'src/types'
  import { fetchTweets } from 'src/lib/data'

  const tweets = createQuery<TweetType[], Error>({
    queryKey: [CONST.QUERY_KEYS.tweets],
    queryFn: () => fetchTweets()
  })
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<h1>Feed</h1>

<Compose />

{#if $tweets.status === 'loading'}
  <span>Loading tweets...</span>
{:else if $tweets.status === 'error'}
  <span>Error: {$tweets.error.message}</span>
{:else}
  {#each $tweets.data as tweet (tweet.id)}
    <Tweet {tweet} />
  {/each}
{/if}

<style>
  h1 {
    position: sticky;
    top: 0;
    padding: var(--spacing-8) var(--spacing-24);
    font-size: var(--font-24);
    backdrop-filter: blur(100px);
  }
</style>
