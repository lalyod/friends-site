<script>
  import { user } from "@/stores/auth";
  import { navigate } from "@/utils/router";

  $: {
    if (!$user) navigate("/login");
  }
</script>

<div>
  {#if $user}
    <slot />
  {/if}
</div>
