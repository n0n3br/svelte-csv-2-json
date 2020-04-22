<script>
  import { createEventDispatcher } from "svelte";
  import PreviewWorker from "web-worker:./preview-worker";
  import "bulma-checkradio/dist/css/bulma-checkradio.min.css";
  import Loading from "../Loading.svelte";

  export let file, config;

  const dispatch = createEventDispatcher();
  let loading = false,
    headers = [],
    previewLines = [],
    previewWorker = new PreviewWorker();

  previewWorker.onmessage = ({ data }) => {
    previewLines = data.lines;
    headers = data.headers;
    loading = false;
  };

  $: if (file && config.separator) {
    loading = true;
    previewWorker.postMessage({ file, ...config });
  }

  const onComplete = () => dispatch("complete");

  $: canComplete =
    file &&
    config.decimal &&
    config.separator &&
    previewLines.length &&
    !loading;
</script>

<style>
  table {
    width: 100%;
  }
</style>

<Loading {loading} />
<div class="columns">
  <div class="column is-one-third">
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Separator</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              type="text"
              bind:value={config.separator}
              class="input is-small"
              maxlength="1" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="column is-one-third">
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Decimal</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              type="text"
              bind:value={config.decimal}
              class="input is-small"
              maxlength="1" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="column is-one-third has-text-centered">
    <div class="field has-margin-top-5">
      <input
        type="checkbox"
        class="is-checkradio"
        id="headers"
        bind:checked={config.hasHeaders} />
      <label for="headers" class="has-text-weight-bold">Header</label>
    </div>
  </div>
</div>
<div class="columns">
  <div class="column">
    <table class="table is-striped">
      <thead>
        <tr>
          {#each headers as header}
            <td>{header}</td>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each previewLines as line}
          <tr>
            {#each line as column}
              <td>{column}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
<hr />
<div class="columns">
  <div class="column">
    <button
      class="button is-primary is-pulled-right"
      on:click={onComplete}
      disabled={!canComplete}>
      Generate JSON
    </button>
  </div>
</div>
