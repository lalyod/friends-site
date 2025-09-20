<script>
  import GuestGuard from "@/components/GuestGuard.svelte";
  import { discordConfig } from "@/config/env";
  import { setAuth } from "@/stores/auth";
  import discordSDK from "@/utils/discord";
  import { navigate } from "@/utils/router";
  import { onMount } from "svelte";

  const code = new URLSearchParams(location.search).get("code");

  let error = null;

  onMount(async () => {
    if (!code) return;

    try {
      error = null;

      const data = await discordSDK().getToken(code);

      localStorage.setItem("token", data.access_token);
      const user = await discordSDK().getMe(data.access_token);
      setAuth(user);
      if (user) {
        navigate("/");
      }
    } catch {
      error = "Login tidak valid silahkan coba lagi.";
      navigate("/login");
    }
  });
</script>

<GuestGuard>
  <div class="flex justify-center items-center h-screen">
    <div class="max-w-96 w-full card bg-base-200 border border-base-300">
      <div class="card-body">
        <h3 class="text-2xl font-semibold">Login</h3>
        <p class="-mt-1 mb-2 text-muted">
          Silahkan login menggunakan discord untuk membuktikan bahwa anda member <b
            >Friendsland</b
          >.
        </p>
        <a href={discordConfig.GENERATED_URI} class="w-full">
          <button disabled={code != null} class="w-full btn bg-[#7289da]">
            {#if code}
              <div class="loading loading-spinner"></div>
              Sedang Login...
            {:else}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="fill-white"
                ><path
                  d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
                ></path></svg
              >
              Discord
            {/if}
          </button>
        </a>
      </div>
    </div>
  </div>
</GuestGuard>
