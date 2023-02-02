<script lang="ts">
    import { page } from "$app/stores"
    import Tweet from 'src/components/tweet.svelte'
    import Icon from 'src/components/icon.svelte'

    $: session = $page.data.session
    $: profile = $page.data.profile
</script>

<svelte:head>
    <title>{profile.name} ({profile.handle})</title>
</svelte:head>

<div class="profile">
    <img class="banner" src={profile.banner || '/profile/banner_bg.jpeg'} alt="Profile banner" />
    <img class="avatar" src={profile.avatar} alt={profile.name} />
    <a href="/home/profile/edit" sveltekit:prefetch>
        <Icon width="32" height="32" name="edit" />
        <span>Edit</span>
    </a>
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

<div>
    Tweets:
</div>

{#each profile.tweets as tweet (tweet.id)}
    <Tweet {tweet} />
{/each}

<style>
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
</style>
