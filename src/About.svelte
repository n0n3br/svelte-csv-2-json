<script>
  import { createEventDispatcher } from "svelte";
  export let open;
  const dispatch = createEventDispatcher();
</script>

<style>
  img {
    width: 100px;
  }
</style>

<div class="modal" class:is-active={open}>
  <div class="modal-background" />
  <div class="modal-content">
    <div class="card">
      <div class="card-content">

        <h1 class="title has-text-centered">csv2json</h1>
        <div class="subtitle has-text-centered">
          powered by
          <a href="https://svelte.dev" target="_blank">Svelte</a>
          and
          <a href="https://bulma.io" target="_blank">Bulma</a>
        </div>
        <hr />
        <div class="has-text-centered">
          <img
            src="https://avatars2.githubusercontent.com/u/371808?s=400&v=4"
            alt="avatar" />
          <p>Built by Rogério Luiz Aques de Amorim</p>
          <p>
            Sourcecode available at
            <a
              href="https://github.com/n0n3br/svelte-csv-2-json"
              target="_blank">
              Github
            </a>
          </p>

        </div>
      </div>
    </div>
  </div>
  <button
    class="modal-close is-large"
    aria-label="close"
    on:click={() => {
      dispatch('close');
    }} />
</div>
