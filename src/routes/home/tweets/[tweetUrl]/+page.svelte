<script>
  import Tweet from 'src/components/Tweet.svelte'
  import Comment from 'src/components/Comment.svelte'
  import ComposeComment from 'src/components/ComposeComment.svelte'

  export let data
</script>

{#if data.tweet}
  <Tweet tweet={data.tweet} />
{/if}
{#if data.tweet.comments}
  {#each data.tweet.comments as comment (comment.id)}
    <Comment {comment} />
  {/each}
{/if}
<ComposeComment tweetId={data.tweet.id} />
