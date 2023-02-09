<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faComment, faHeart, faTrashCan } from '@fortawesome/free-regular-svg-icons'
  import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'

  import { page } from '$app/stores'
  import {goto} from "$app/navigation";
  import { PUBLIC_BASE_URL } from '$env/static/public'
  import { timePosted } from '$lib/functions.js'
  import { CONST } from 'src/constants'

  import { fade, fly } from 'svelte/transition'

  import { enhance } from 'src/lib/form'
  import type { TweetType } from 'src/types'
  import { createMutation, useQueryClient } from '@tanstack/svelte-query'

  export let tweet: TweetType

  const client = useQueryClient()

  const deleteMutation = createMutation(
    (id: number) =>
      fetch(`${PUBLIC_BASE_URL}/protected/api/tweets?id=${id}`, {
        method: 'DELETE'
      }),
    {
      onSuccess: () => {
        client.invalidateQueries([CONST.QUERY_KEYS.tweets])
        client.invalidateQueries([CONST.QUERY_KEYS.user])
        if ($page.url.pathname.includes(`/tweets/${tweet.url}`)){
          goto('/protected/home')
        }
      }
    }
  )

  const deleteHandel = (id: number) => {
    $deleteMutation.mutate(id)
  }
</script>

<article class="tweet-container" transition:fade>
  <div class="avatar">
    <img width="140" height="140" src={tweet.author.avatar} alt={tweet.author.name} />
  </div>

  <div class="tweet-details">
    <div>
      <span class="user">{tweet.author.name}</span>
      <span class="handle">{tweet.author.handle}</span>
      <span class="posted"> · {timePosted(tweet.createdAt)}</span>
    </div>

    <div class="tweet">
      <div class="content">
        {tweet.content}
      </div>

      <div class="actions">
        <form
          action="/protected/api/like/tweet"
          method="POST"
          use:enhance={{
            result: () => {
              client.invalidateQueries([CONST.QUERY_KEYS.tweets])
              client.invalidateQueries([CONST.QUERY_KEYS.user])
            }
          }}
        >
          <input type="hidden" name="tweetId" value={tweet.id} />
          <button class="btn like" title="Like" type="submit">
            <div class="circle">
              <Fa
                size="lg"
                icon={tweet.liked ? faHeartSolid : faHeart}
                class={tweet.liked ? 'liked' : ''}
              />
            </div>
            <span class="count">
              {#key tweet.likes}
                <div in:fly={{ y: 40 }} out:fly={{ y: 40 }}>
                  {tweet.likes}
                </div>
              {/key}
            </span>
          </button>
        </form>

        <a href="/protected/home/tweets/{tweet.url}" class="comment" title="Comments">
          <div class="circle">
            <Fa size="lg" icon={faComment} />
          </div>
          <span class="count" in:fly={{ y: 40 }} out:fly={{ y: 40 }}>
            {typeof tweet.comments === 'number' ? tweet.comments : tweet.comments.length}
          </span>
        </a>

        {#if tweet.author.id === $page.data.profile.id}
          <button
            aria-label="Remove tweet"
            class="btn remove"
            title="Remove"
            on:click={() => deleteHandel(tweet.id)}
          >
            <div class="circle">
              <Fa size="lg" icon={faTrashCan} />
            </div>
          </button>
        {/if}
      </div>
    </div>
  </div>
</article>

<style>
  .avatar {
    align-self: start;
  }

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  button {
    font-size: var(--font-16);
    padding: var(--spacing-16);
  }

  .tweet-container:hover {
    background-color: var(--color-bg-secondary);
  }

  .tweet-container {
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: var(--spacing-16);
    padding: var(--spacing-16) var(--spacing-24);
    transition: all 0.3s;
  }

  .tweet-container:not(:last-child) {
    border-bottom: 1px solid var(--color-border-primary);
  }

  .tweet-details {
    display: grid;
    gap: var(--spacing-8);
  }

  .user {
    font-weight: 700;
    text-transform: capitalize;
  }

  .user:hover {
    text-decoration: underline;
  }

  .handle,
  .posted {
    font-size: var(--font-16);
    color: var(--color-text-muted);
  }

  .content {
    font-size: var(--font-16);
  }

  .actions {
    display: flex;
    gap: var(--spacing-32);
    margin-top: var(--spacing-16);
  }

  .actions button,
  .actions a {
    padding: 0;
    color: var(--color-text-muted);
    background: none;
    transition: all 0.3s;
  }

  .circle {
    width: 24px;
    height: 24px;
    display: grid;
    place-content: center;
    padding: var(--spacing-16);
    border-radius: 50%;
    transition: all 0.3s;
  }

  .circle > :global(.liked) {
    color: hsl(9 100% 64%);
    fill: hsl(9 100% 64%);
  }

  .like,
  .comment {
    display: flex;
    align-items: center;
  }

  .like:hover {
    color: hsl(9 100% 64%);
  }

  .like:hover .circle {
    background: hsla(9 100% 64% / 10%);
  }

  .comment:hover {
    color: hsl(120 100% 40%);
  }

  .comment:hover .circle {
    background-color: hsla(120 100% 50% / 4%);
  }

  .remove:hover {
    color: hsl(0 100% 50%);
  }

  .remove:hover .circle {
    background-color: hsla(0 100% 50% / 4%);
  }

  .like,
  .remove,
  .comment {
    width: 80px;
  }

  .count {
    margin-left: var(--spacing-16);
    font-size: 1.4rem;
    font-weight: 400;
    overflow: hidden;
  }
</style>
