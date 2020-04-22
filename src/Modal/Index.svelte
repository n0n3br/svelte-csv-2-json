<script>
  import Loading from "../Loading.svelte";
  import Config from "./Config.svelte";
  import Result from "./Result.svelte";

  import { onMount } from "svelte";
  export let file;
  let loading = false,
    page = 1,
    config = {
      separator: ",",
      decimal: ".",
      hasHeaders: false
    };

  $: component = page === 1 ? Config : Result;

  const onComplete = () => {
    switch (page) {
      case 1:
        page = 2;
        break;
      case 2:
        file = null;
        break;
      default:
        return;
    }
  };
</script>

<style>
  .modal-content {
    width: 90%;
  }
</style>

{#if file}
  <div class="modal is-active">
    <div class="modal-background" />
    <div class="modal-content">
      <Loading {loading} />
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{file.name}</p>
        </header>
        <div class="card-content">
          <svelte:component
            this={component}
            {file}
            on:complete={onComplete}
            on:goback={() => {
              page = 1;
            }}
            bind:config />
        </div>
      </div>

    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      on:click={() => {
        file = null;
      }} />
  </div>
{/if}
