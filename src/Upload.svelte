<script>
  export let file;
  let uploadInput, files;
  const triggerUpload = () => {
    uploadInput.click();
  };
  const onUpload = () => {
    if (!files.length) return;
    file = files[0];
    files = null;
    uploadInput.value = "";
  };
</script>

<section class="hero is-fullheight-with-navbar is-primary">
  <div class="hero-body">
    <div class="container has-text-centered">
      <button
        class="button is-primary is-outlined is-inverted is-large"
        on:click={triggerUpload}>
        Upload a CSV file
      </button>
      <input
        type="file"
        class="is-hidden"
        bind:this={uploadInput}
        bind:files
        accept=".csv, .txt"
        on:change={onUpload} />
    </div>
  </div>
</section>
