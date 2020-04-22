<script>
  import Loading from "../Loading.svelte";
  import "simple-json-viewer/dist/simple-json-viewer.min.js";
  import "bulma-switch/dist/css/bulma-switch.min.css";
  import { onMount, tick, createEventDispatcher } from "svelte";
  import Worker from "web-worker:./result-worker.js";
  import bulmaToast from "bulma-toast";

  export let file, config;

  let json = {},
    loading = false,
    preview = false;

  const dispatch = createEventDispatcher();

  onMount(() => {
    loading = true;
    const worker = Worker();
    worker.onmessage = ({ data }) => {
      json = data;
      loading = false;
    };
    worker.postMessage({ file, ...config });
  });
  $: if (preview) {
    tick().then(() => {
      window.createJSONViewer(document.querySelector(".json-fancy"), json);
    });
  }

  const goBack = () => {
    dispatch("goback");
  };

  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = jsonString;
    document.body.appendChild(el);
    el.select();
    const result = document.execCommand("copy");
    bulmaToast.toast({
      message: result
        ? "JSON succesfully copied to clipboard"
        : "There was an error copying the JSON",
      type: result ? "is-primary" : "is-danger",
      position: "bottom-right"
    });
    document.body.removeChild(el);
  };

  const downloadJson = () => {
    let hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(jsonString);
    hiddenElement.target = "_blank";
    hiddenElement.download = file.name.replace(".csv", ".json");
    hiddenElement.click();
  };

  const onComplete = () => {
    dispatch("complete");
  };

  $: jsonString = JSON.stringify(json, null, 2);
</script>

<style>
  .json-text,
  .json-fancy {
    width: 100%;
    height: 65vh;
  }
  .json-text {
    border: 1px solid lightgray;
  }
</style>

<Loading {loading} />
<div class="columns is-marginless">
  <div class="column is-paddingless">
    <div class="field is-pulled-right">
      <label for="preview" class="label is-inline-block has-margin-right-10">
        Text
      </label>
      <input
        class="switch is-rounded is-outlined"
        type="checkbox"
        id="preview"
        bind:checked={preview} />
      <label class="label" for="preview">Fancy</label>
    </div>
  </div>
</div>
<div class="columns">
  <div class="column">
    {#if preview}
      <div class="json-fancy" />
    {:else}
      <pre class="json-text">{jsonString}</pre>
    {/if}
  </div>
</div>
<div class="columns">
  <div class="column">
    <button class="button is-primary is-outlined" on:click={goBack}>
      Go Back
    </button>
    <button
      class="button is-primary is-outlined is-pulled-right"
      on:click={onComplete}
      disabled={loading}>
      Convert another file
    </button>
    <button
      class="button is-primary is-pulled-right has-margin-right-10"
      on:click={downloadJson}
      disabled={loading}>
      Export file
    </button>
    <button
      class="button is-primary is-pulled-right has-margin-right-10"
      on:click={() => {
        copyToClipboard(jsonString);
      }}
      disabled={loading}>
      Copy to clipboard
    </button>
  </div>
</div>
