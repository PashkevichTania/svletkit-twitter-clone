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
            placeholder="What's your hot take?"
            type="text"
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
