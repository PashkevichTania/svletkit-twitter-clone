<script lang="ts">
  import Fa from 'svelte-fa/src/fa.svelte'
  import { faHeart, faTrashCan } from '@fortawesome/free-regular-svg-icons'
  import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
  import { page } from '$app/stores'
  import { PUBLIC_BASE_URL } from '$env/static/public'
  import { timePosted } from '$lib/functions.js'
  import { CONST } from 'src/constants'

  import { fade, fly } from 'svelte/transition'

  import { enhance } from 'src/lib/form'
  import type { Comment } from 'src/types'
  import { createMutation, useQueryClient } from '@tanstack/svelte-query'

  export let comment: Comment

  const client = useQueryClient()

  const deleteMutation = createMutation(
    (id: number) =>
      fetch(`${PUBLIC_BASE_URL}/api/comments?id=${id}`, {
        method: 'DELETE'
      }),
    {
      onSuccess: () => {
        client.invalidateQueries([CONST.QUERY_KEYS.tweets, $page.params.tweetUrl])
      }
    }
  )

  const deleteHandel = (id: number) => {
    $deleteMutation.mutate(id)
  }
</script>

<article class="comment-container" transition:fade>
  <div class="avatar">
    <img width="140" height="140" src={comment.author.avatar} alt={comment.author.name} />
  </div>

  <div class="comment-details">
    <div>
      <span class="user">{comment.author.name}</span>
      <span class="handle">{comment.author.handle}</span>
      <span class="posted"> · {timePosted(comment.createdAt)}</span>
    </div>

    <div class="comment">
      <div class="content">
        {comment.content}
      </div>

      <div class="actions">
        <form
          action="/api/like/comment"
          method="POST"
          use:enhance={{
            result: () => {
              client.invalidateQueries([CONST.QUERY_KEYS.tweets, $page.params.tweetUrl])
            }
          }}
        >
          <input type="hidden" name="commentId" value={comment.id} />
          <button class="btn like" title="Like" type="submit">
            <div class="circle">
              <Fa
                size="lg"
                icon={comment.liked ? faHeartSolid : faHeart}
                class={comment.liked ? 'liked' : ''}
              />
            </div>
            <span class="count" in:fly={{ y: 40 }} out:fly={{ y: 40 }}>
              {comment.likes}
            </span>
          </button>
        </form>

        {#if comment.author.id === $page.data.profile.id}
          <button
            aria-label="Remove comment"
            class="btn remove"
            title="Remove"
            on:click={() => deleteHandel(comment.id)}
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

  .comment-container:hover {
    background-color: var(--color-bg-secondary);
  }

  .comment-container {
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: var(--spacing-16);
    padding: var(--spacing-16) var(--spacing-24);
    transition: all 0.3s;
  }

  .comment-container:not(:last-child) {
    border-bottom: 1px solid var(--color-border-primary);
  }

  .comment-details {
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

  .actions button {
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

  .like {
    display: flex;
    align-items: center;
  }

  .like:hover {
    color: hsl(9 100% 64%);
  }

  .like:hover .circle {
    background: hsla(9 100% 64% / 10%);
  }

  .remove:hover {
    color: hsl(0 100% 50%);
  }

  .remove:hover .circle {
    background-color: hsla(0 100% 50% / 4%);
  }

  .like,
  .remove {
    width: 80px;
  }

  .count {
    margin-left: var(--spacing-16);
    font-size: 1.4rem;
    font-weight: 400;
    overflow: hidden;
  }
</style>
