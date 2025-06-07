<script>
  import { user } from "@/store/user";
  import discordSDK from "@/utils/discord";
  import { onMount, setContext } from "svelte";

  const discord = discordSDK();

  onMount(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const discordUser = await discord.getMe(token);
    user.set(discordUser);
  });
</script>

<div>
  <header class="py-3 px-6 border-b border-base-300">
    <div class="flex justify-between">
      <h3 class="text-lg font-semibold">Dashboard</h3>
      {#if $user != null}
        <p class="font-semibold">{$user.username}</p>
      {:else}
        <a href="/login" class="font-semibold">Login</a>
      {/if}
    </div>
  </header>

  <slot />
</div>
