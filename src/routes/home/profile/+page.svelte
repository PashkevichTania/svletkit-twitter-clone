<script lang="ts">
    import {page} from "$app/stores"
    import { fetchUserTweets } from "$lib/data";
    import {createQuery} from "@tanstack/svelte-query";
    import Icon from 'src/components/icon.svelte'
    import Tweet from 'src/components/tweet.svelte'
    import {CONST} from "src/constants";
    import type { TweetType } from "src/types";
    import {userStore} from "src/utils/store";

    $: session = $page.data.session
    $: profile = $userStore || $page.data.profile

    const tweets = createQuery<TweetType[], Error>({
        queryKey: [CONST.QUERY_KEYS.userTweets],
        queryFn: () => fetchUserTweets()
    })
</script>

<svelte:head>
    <title>{profile.name} ({profile.handle})</title>
</svelte:head>

<div class="profile">
    <img class="banner" src={profile.banner || '/profile/banner_bg.jpeg'} alt="Profile banner"/>
    <img class="avatar" src={profile.avatar} alt={profile.name}/>
    <div class="edit">
        <a class="edit_btn" href="/home/profile/edit" sveltekit:prefetch>
            <Icon width="32" height="32" name="edit"/>
            <span>Edit</span>
        </a>
    </div>
</div>

<div class="content">
    <div class="user">
        <span class="name">{profile.name}</span>
        <span class="handle">{profile.handle}</span>
    </div>
    <div class="about">
        <span>About: {profile.about}</span>
    </div>
</div>

<div class="tweets">
    <p>Tweets: {$tweets.data.length || 0}</p>

    {#if $tweets.status === 'loading'}
        <span>Loading tweets...</span>
    {:else if $tweets.status === 'error'}
        <span>Error: {$tweets.error.message}</span>
    {:else}
        {#each $tweets.data as tweet (tweet.id)}
            <Tweet {tweet} />
        {/each}
    {/if}
</div>

<style lang="scss">
  .profile {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 200px 60px;
  }

  .banner {
    grid-column: 1 / -1;
    grid-row: 1 / 2;
  }

  .avatar {
    grid-column: 1 / 2;
    grid-row: 1 / -1;
    place-self: center;
    align-self: flex-end;
    width: 120px;
    height: 120px;
    margin: 0 var(--spacing-16);
    border-radius: 50%;
    border: 4px solid var(--color-bg-primary);
  }

  .edit {
    grid-column: 4 / -1;
    grid-row: 2 / -1;
    place-self: center;
    align-self: flex-end;
  }

  .edit_btn {
    display: flex;
    align-items: center;

    span {
      margin-left: 5px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content {
    display: grid;
    gap: var(--spacing-16);
    margin-top: var(--spacing-16);
    padding: 0 var(--spacing-16);
  }

  .user {
    display: grid;
  }

  .name {
    font-size: var(--font-24);
    font-weight: 700;
    text-transform: capitalize;
  }

  .handle {
    color: var(--color-text-muted);
  }

  .tweets {
    margin: 15px;
  }
</style>
