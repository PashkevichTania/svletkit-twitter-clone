<script lang="ts">
  import { page } from '$app/stores'
  import { faHouse, faUser, faGear, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
  import { CONST } from 'src/constants.js'
  import Fa from 'svelte-fa/src/fa.svelte'

  $: path = $page.url.pathname
</script>

<aside>
  <div class="container">
    <nav>
      <ul>
        <li>
          <a href="/" class="logo">{CONST.icon}️</a>
        </li>
        <li class:active={path === '/protected/home'}>
          <a href="/protected/home" sveltekit:prefetch>
            <Fa size="lg" icon={faHouse} />
            <span>Home</span>
          </a>
        </li>
        <li class:active={path === '/protected/home/profile/'}>
          <a href="/protected/home/profile/" sveltekit:prefetch>
            <Fa size="lg" icon={faUser} />
            <span>Profile</span>
          </a>
        </li>
        <li class:active={path === '/protected/home/settings'}>
          <a href="/protected/home/settings" sveltekit:prefetch>
            <Fa size="lg" icon={faGear} />
            <span>Settings</span>
          </a>
        </li>
        <li class:active={path === '/protected/home/about'}>
          <a href="/protected/home/about" sveltekit:prefetch>
            <Fa size="lg" icon={faCircleInfo} />
            <span>About</span>
          </a>
        </li>
      </ul>
    </nav>

    <button class="btn tweet">Tweet</button>
  </div>
</aside>

<style>
  .container {
    position: sticky;
    top: 0;
  }

  ul {
    display: grid;
    gap: var(--spacing-8);
    font-size: var(--font-18);
  }

  li a {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-16);
    padding: 1.4rem;
    border-radius: var(--radius-base);
    transition: all 0.2s ease;
  }

  li a:hover {
    background-color: var(--color-link-hover);
  }

  li.active {
    font-weight: 700;
  }

  .logo {
    font-size: var(--font-32);
  }

  span {
    display: none;
  }

  .tweet {
    display: none;
    text-align: center;
  }

  .tweet:hover {
    background-color: var(--color-btn-primary-active-hover);
  }

  @media (min-width: 1024px) {
    aside {
      padding: 0 var(--spacing-32);
    }

    span {
      display: block;
    }

    .tweet {
      width: 100%;
      display: block;
      margin-top: var(--spacing-16);
    }
  }
</style>
