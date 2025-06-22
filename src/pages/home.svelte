<script>
  import Stat from "@/components/Stat.svelte";
  import { botID } from "@/config/env";
  import { user } from "@/store/user";
  import { fetchJSON } from "@/utils/api";
  import { formatFullDateID } from "@/utils/dateFormat";
  import discordSDK from "@/utils/discord";
  import { onMount } from "svelte";

  let app = null;
  let terminal = null;
  let loading = false;
  let fetchLoading = false;

  onMount(async () => {
    handleFetch();
    handleDiscordCode();
  });

  async function handleFetch() {
    try {
      fetchLoading = true;
      const { apps } = await fetchJSON(`/app/${botID}/status`, {});
      const { apps: logs } = await fetchJSON(`/app/${botID}/logs`, {});

      terminal = logs.terminal.big;
      app = apps;
    } catch (err) {
      console.log(err);
    } finally {
      fetchLoading = false;
    }
  }

  async function handleRestart() {
    try {
      loading = true;
      await fetchJSON(`/app/${botID}/restart`, { method: "PUT" });
    } finally {
      await handleFetch();
      loading = false;
    }
  }

  async function handleStop() {
    try {
      loading = true;
      await fetchJSON(`/app/${botID}/stop`, { method: "PUT" });
    } finally {
      await handleFetch();
      loading = false;
    }
  }

  async function handleDiscordCode() {
    const code = new URLSearchParams(location.search).get("code");
    if (!code) return;

    const data = await discordSDK().getToken(code);

    localStorage.setItem("token", data.access_token);
    if (data.access_token) {
      location.href = "/";
    }
  }
</script>

<main class="px-4 lg:px-6">
  <div class="my-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
    <Stat
      title="Status Bot"
      value={app?.container ?? "Loading..."}
      info={`Online ${app?.last_restart || $app?.last_restart === "Offline" ? "0 hours" : $app?.last_restart}`}
      detailInfo={app?.startedAt != "Offline"
        ? `Started at ${app?.startedAt && formatFullDateID(app.startedAt)}`
        : "Bot is offline"}
    />
    <Stat
      title="CPU Usage"
      value={app?.cpu ?? "Loading..."}
      info={app
        ? parseFloat(app.cpu?.replace("%", "")) > 50
          ? "Upnormal"
          : "Normal"
        : "Loading..."}
      detailInfo={app
        ? parseFloat(app.cpu?.replace("%", "")) > 50
          ? "Bot cpu is abnormal please do something."
          : "Bot cpu is normal you relax for now."
        : "Loading..."}
    />
    <Stat
      title="RAM Usage"
      value={app?.memory ?? "Loading..."}
      info={app
        ? parseFloat(app.cpu?.replace("%", "")) > 50
          ? "Abnomal"
          : "Normal"
        : "Loading..."}
      detailInfo={app
        ? parseFloat(app.cpu?.replace("%", "")) > 50
          ? "RAM is abnormal please do something."
          : "RAM is normal you can relax for now."
        : "Loading..."}
    />
    <Stat
      title="Download"
      value={app?.netIO.down ?? "Loading..."}
      info={app
        ? parseFloat(app.netIO.down?.replace("MB", "")) > 500
          ? "Too Much"
          : "Normal"
        : "Loading..."}
      detailInfo={app
        ? `Bot already use ${app.netIO.down} download.`
        : "Loading..."}
    />
  </div>
  {#if $user?.id === "793991682310799360" || $user?.id === "454505144068079616"}
    <div class="w-96 card bg-base-200 border border-base-300">
      <div class="card-body">
        <h3 class="card-title">Bot Actions</h3>
        <p class="text-muted">Restart or stop bot using this buttons.</p>
        <div class="mt-5 card-actions">
          <button
            disabled={loading || app?.container === "Offline"}
            onclick={async () => {
              const sure = confirm("Are you sure?");
              if (sure) {
                await handleStop();
              }
            }}
            class="grow btn btn-error">Stop</button
          >
          {#if app?.container == "Online"}
            <button
              disabled={loading}
              onclick={handleRestart}
              class="grow btn btn-primary">Restart</button
            >
          {:else}
            <button
              disabled={loading}
              onclick={handleRestart}
              class="grow btn btn-primary">Start</button
            >
          {/if}
        </div>
      </div>
    </div>
  {/if}
  <h3 class="text-xl font-bold mb-3">Logs</h3>
  <div class="mockup-window border border-base-300 dark:bg-base-200">
    {#if fetchLoading === true}
      <div class="h-52 flex items-center justify-center">
        <div class="loading loading-spinner w-10"></div>
      </div>
    {:else}
      <pre class="max-h-96 mx-3 px-3 mb-3 pb-3 overflow-y-auto">{terminal}</pre>
    {/if}
  </div>
</main>
