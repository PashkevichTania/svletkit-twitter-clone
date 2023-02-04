<script>
    import Tweet from 'src/components/Tweet.svelte'

    export let data;
</script>

{#if data.tweet}
    <Tweet tweet={data.tweet} />
{/if}
