<script>
  const Home = import("@/pages/home.svelte");
  const Login = import("@/pages/login.svelte");
</script>

<main>
  {#if location.pathname == "/"}
    {#await Home then { default: Home }}
      <Home />
    {/await}
  {:else if location.pathname == "/login"}
    {#await Login then { default: Login }}
      <Login />
    {/await}
  {/if}
</main>
