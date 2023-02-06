<script>
    import {page} from '$app/stores'
    import {createQuery} from "@tanstack/svelte-query"
    import Comment from 'src/components/Comment.svelte'
    import ComposeComment from 'src/components/ComposeComment.svelte'
    import Tweet from 'src/components/Tweet.svelte'
    import {CONST} from "src/constants"
    import {fetchTweet} from "src/lib/data"


    const tweet = createQuery({
        queryKey: [CONST.QUERY_KEYS.tweets, $page.params.tweetUrl],
        queryFn: () => fetchTweet($page.params.tweetUrl)
    })
</script>

{#if $tweet.status === 'loading'}
    <span>Loading tweet...</span>
{:else if $tweet.status === 'error'}
    <span>Error: {$tweet.error.message}</span>
{:else}
    {#if $tweet.data}
        <Tweet tweet={$tweet.data}/>
      {#if $tweet.data.comments.length}
        {#each $tweet.data.comments as comment (comment.id)}
          <Comment {comment}/>
        {/each}
      {/if}
      <ComposeComment tweetId={$tweet.data.id}/>
    {/if}
{/if}