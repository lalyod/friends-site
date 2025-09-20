<script>
  import { currentRoute } from "./utils/router";

  let RouterProvider = null;

  $: {
    switch ($currentRoute) {
      case "/":
        import("./pages/home.svelte").then((m) => (RouterProvider = m.default));
      case "/login":
        import("./pages/login.svelte").then(
          (m) => (RouterProvider = m.default),
        );
      default:
        RouterProvider = null;
    }
  }
</script>

<main>
    <svelte:component this={RouterProvider} />
</main>
