<script lang="ts">
  import { page } from '$app/stores'
</script>

<div class="error">
  <h1 class="error-status">{$page.status}</h1>
  <p class="error-message">{$page.error.message}</p>
</div>

<style>
  .error {
    height: 100vh;
    display: grid;
    gap: var(--spacing-32);
    place-content: center;
    place-items: center;
    font-family: 'Ubuntu', sans-serif;
  }

  .error-status {
    font-size: 15rem;
    font-weight: bold;
    color: #c81010;
    text-align: center;
    letter-spacing: 5px;
    text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3), 0 -4px 10px rgba(255, 255, 255, 0.3);
    z-index: 1;
  }

  .error-message {
    font-size: 5rem;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    letter-spacing: 5px;
    text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3), 0 -4px 10px rgba(255, 255, 255, 0.3);
    z-index: 2;
  }
</style>
