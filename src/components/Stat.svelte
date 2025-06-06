<script>
  let { title, value, info, detailInfo } = $props();
</script>

<div class="bg-base-200 border border-base-300 p-5 rounded-xl">
  <p class="text-muted">{title}</p>
  <h3 class="font-bold text-2xl">{value}</h3>
  <p class="mt-2 font-medium">{info}</p>
  <p class="text-muted">
    {detailInfo}
  </p>
</div>
