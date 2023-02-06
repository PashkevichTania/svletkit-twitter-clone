<script lang="ts">
  import { page } from '$app/stores'

  $: session = $page.data.session
  $: profile = $page.data.profile

  // TODO: image upload?
  // let  avatar, fileinput;
</script>

<svelte:head>
  <title>{profile.name} ({profile.handle})</title>
</svelte:head>

<div class="container">
  <h2>Edit profile</h2>
  <form action="/api/user" method="POST" autocomplete="off">
    <div class="row">
      <p class="text">Name:</p>
      <input
        value={profile.name}
        aria-label="Enter new name"
        name="name"
        placeholder="John Doe"
        type="text"
      />
    </div>
    <div class="row">
      <p class="text">Handel:</p>
      <input
        value={profile.handle}
        aria-label="Enter new handle"
        name="handle"
        placeholder="@John42069"
        type="text"
      />
    </div>
    <div class="row">
      <p class="text">Info:</p>
      <input
        value={profile.about}
        aria-label="Enter new profile info"
        name="about"
        placeholder="Something something..."
        type="text"
      />
    </div>
    <div class="row">
      <button class="btn" type="submit"> Update </button>
    </div>

    <!--    <input-->
    <!--            aria-label="Upload new avatar"-->
    <!--            name="avatar"-->
    <!--            type="file"-->
    <!--    />-->
    <!--    <input-->
    <!--            aria-label="Upload new banner"-->
    <!--            name="banner"-->
    <!--            type="file"-->
    <!--    />-->
  </form>
</div>

<style>
  .container {
    margin: var(--spacing-32);
  }
  form {
    margin-top: var(--spacing-16);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-16);
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .text {
    font-size: var(--font-24);
    font-weight: 500;
  }
</style>
