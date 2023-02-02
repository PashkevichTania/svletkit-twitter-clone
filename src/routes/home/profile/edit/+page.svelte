<script lang="ts">
    import { page } from "$app/stores"

    $: session = $page.data.session
    $: profile = $page.data.profile
</script>

<svelte:head>
    <title>{profile.name} ({profile.handle})</title>
</svelte:head>

<form
        action="/api/user"
        method="POST"
        autocomplete="off"
>
    <input
            aria-label="Enter new name"
            name="name"
            placeholder="Name"
            type="text"
    />
    <input
            aria-label="Enter new handle"
            name="handle"
            placeholder="handle"
            type="text"
    />
    <input
            aria-label="Upload new avatar"
            name="avatar"
            type="file"
    />
    <button
            class="btn"
            type="submit"
    >
        Tweet
    </button>
</form>

<style>
</style>
