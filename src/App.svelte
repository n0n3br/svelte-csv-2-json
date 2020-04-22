<script>
  import Nav from "./Nav.svelte";
  import Upload from "./Upload.svelte";
  import Modal from "./Modal/Index.svelte";
  let file = null;
</script>

<style>
  main {
    font-family: "Roboto";
  }
</style>

<svelte:head>
  <title>csv2json</title>
  <link rel="stylesheet" href="build/vendor.css" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto" />

</svelte:head>
<main>
  <Nav />
  <Upload bind:file />
  <Modal bind:file />
</main>
