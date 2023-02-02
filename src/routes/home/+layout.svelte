<script lang="ts">
  import { page } from '$app/stores'
  import {fetchUser} from "$lib/data";
  import {createQuery} from "@tanstack/svelte-query";
  import Navigation from 'src/components/sidebar/navigation.svelte'
  import Trending from 'src/components/sidebar/trending.svelte'
  import Transition from 'src/components/transition.svelte'
  import {CONST} from "src/constants";
  import type {UserProfile} from "src/types";
  import {userStore} from "src/utils/store";

  $: email = $page.data.session?.user?.email || ''

  $: user = createQuery<UserProfile | null, Error>({
    queryKey: [CONST.QUERY_KEYS.user],
    queryFn: async () => await fetchUser(email)
  })
  $: if (user) userStore.set($user.data)
</script>

<div class="container">
  <Navigation />
  <main class="feed">
    <Transition url={$page.url}>
      <slot />
    </Transition>
  </main>
  <Trending />
</div>

<style>
  .container {
    height: 100vh;
    max-width: min-content;
    margin: 0 auto;
    display: grid;
    grid-template-columns: min-content 50ch;
  }
  .feed {
    border: 1px solid var(--color-border-primary);
    border-top: none;
    border-bottom: none;
  }
  @media (min-width: 1024px) {
    .container {
      max-width: 1240px;
      margin: 0 auto;
      grid-template-columns: 1fr 50ch 1fr;
    }
  }
</style>
