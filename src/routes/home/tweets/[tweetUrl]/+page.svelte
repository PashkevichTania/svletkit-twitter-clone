<script>
    import Tweet from 'src/components/tweet.svelte'

    export let data;
</script>

{#if data.tweet}
    <Tweet tweet={data.tweet} />
{/if}
