<script>
  import { user } from "@/store/user";
  import discordSDK from "@/utils/discord";
  import { onMount } from "svelte";

  const discord = discordSDK();

  onMount(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const discordUser = await discord.getMe(token);
      user.set(discordUser);
    } catch (err) {
      localStorage.removeItem("token")
    }
  });
</script>

<div>
  <header class="py-3 px-6 border-b border-base-300">
    <div class="flex justify-between">
      <h3 class="text-lg font-semibold">Dashboard</h3>
      {#if $user != null}
        <div class="dropdown dropdown-end">
          <button class="btn btn-ghost">{$user.username}</button>
          <ul
            class="mt-2 dropdown-content menu rounded-box w-52 shadow-lg bg-base-100 border border-base-300"
          >
            <li>
              <div class="dropdown dropdown-left dropdown-hover">
                <button>Apperance</button>
                <ul
                  class="dropdown-content w-52 bg-base-100 border border-base-300 rounded-box"
                >
                  <li><button>Dark</button></li>
                  <li><button>Light</button></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      {:else}
        <a
          href="https://discord.com/oauth2/authorize?client_id=1089840401994748044&response_type=code&redirect_uri=https%3A%2F%2Fdemo-friends-site.netlify.app%2F&scope=identify"
          class="font-semibold">Login</a
        >
      {/if}
    </div>
  </header>

  <slot />
</div>
