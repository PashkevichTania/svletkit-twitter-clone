<script>
  import { page } from '$app/stores'
  import { createQuery } from '@tanstack/svelte-query'
  import Comment from 'src/components/Comment.svelte'
  import ComposeComment from 'src/components/ComposeComment.svelte'
  import Tweet from 'src/components/Tweet.svelte'
  import { QUERY_KEYS } from 'src/constants'
  import { fetchTweet } from 'src/lib/data'

  const tweet = createQuery({
    queryKey: [QUERY_KEYS.tweets, $page.params.tweetUrl],
    queryFn: () => fetchTweet($page.params.tweetUrl)
  })
</script>

{#if $tweet.status === 'loading'}
  <span>Loading tweet...</span>
{:else if $tweet.status === 'error'}
  <span>Error: {$tweet.error.message}</span>
{:else if $tweet.data}
  <Tweet tweet={$tweet.data} />
  <div class="comments-title">
    <h3>Comments:</h3>
  </div>
  {#if $tweet.data.comments.length}
    <section class="comments-section">
      {#each $tweet.data.comments as comment (comment.id)}
        <Comment {comment} />
      {/each}
    </section>
  {/if}
  <div class="compose">
    <ComposeComment tweetId={$tweet.data.id} />
  </div>
{/if}

<style>
  .comments-title {
    font-weight: 700;
    text-transform: capitalize;
    padding: var(--spacing-16);
    border-bottom: 2px solid var(--color-border-primary);
  }
  .comments-section {
    position: relative;
    padding-bottom: 100px;
  }
  .compose {
    background-color: var(--color-bg-primary);
    position: fixed;
    bottom: 0;
  }
</style>
