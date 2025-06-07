<script>
  import Layout from "./components/Layout.svelte";
  const Home = import("@/pages/home.svelte");
  const Login = import("@/pages/login.svelte");
</script>

<main>
  <Layout>
    {#if location.pathname == "/"}
      {#await Home then { default: Home }}
        <Home />
      {/await}
    {:else if location.pathname == "/login"}
      {#await Login then { default: Login }}
        <Login />
      {/await}
    {/if}
  </Layout>
</main>
