<script>
    import Tweet from 'src/components/Tweet.svelte'
    import Comment from 'src/components/Comment.svelte'

    export let data;

    console.debug(data);
//    TODO: make comments different endpoit? so u can invalidate only comments or mb invalidte only this page
</script>

{#if data.tweet}
    <Tweet tweet={data.tweet} />
{/if}
{#if data.tweet.comments}
    {#each data.tweet.comments as comment (comment.id)}
        <Comment {comment} />
    {/each}
{/if}