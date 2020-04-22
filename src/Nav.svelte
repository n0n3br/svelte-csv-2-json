<script>
  import About from "./About.svelte";
  let open = false;
</script>

<nav class="navbar is-primary" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <div class="navbar-item">
      <img
        src="svelte-logo.png"
        alt="svelte logo"
        class="has-margin-right-10" />
      <h4 class="is-size-5">csv2json</h4>
    </div>
  </div>
  <div class="navbar-end">
    <div class="navbar-item">
      <button
        class="button is-primary"
        on:click={() => {
          open = true;
        }}>
        About
      </button>
    </div>
  </div>
</nav>

<About
  {open}
  on:close={() => {
    open = false;
  }} />
