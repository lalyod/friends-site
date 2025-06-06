<script>
  import Stat from "@/components/Stat.svelte";
  import { botID } from "@/config/env";
  import { fetchJSON } from "@/utils/api";
  import { formatFullDateID } from "@/utils/dateFormat";
  import { onMount } from "svelte";

  let app = null;
  let loading = false;

  onMount(async () => {
    handleFetch();
  });

  async function handleFetch() {
    const res = await fetchJSON(`/app/${botID}/status`, {});
    const user = await fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    app = res?.apps;
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
</script>

<main class="mx-auto lg:max-w-7xl">
  <div class="my-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5">
    <Stat
      title="Status Bot"
      value={app?.container ?? "Loading..."}
      info={`Online ${app?.last_restart ?? "0 hours"}`}
      detailInfo={`Started at ${app?.startedAt && formatFullDateID(app.startedAt)}`}
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
  <div class="w-96 card bg-base-200 border border-base-300">
    <div class="card-body">
      <h3 class="card-title">Bot Actions</h3>
      <p class="text-muted">Restart or stop bot using this buttons.</p>
      <div class="mt-5 card-actions">
        <button
          disabled={loading}
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
</main>
