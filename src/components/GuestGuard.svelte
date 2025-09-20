<script>
  import { user } from "@/stores/auth";
  import { navigate } from "@/utils/router";

  $: {
    if ($user) navigate("/");
  }
</script>

<slot />
