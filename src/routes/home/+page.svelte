
<script lang="ts">
  import Compose from 'src/components/compose.svelte'
  import Tweet from 'src/components/tweet.svelte'
  import type { TweetType } from 'src/types'
  export let tweets: TweetType[] = []
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<h1>Feed</h1>
