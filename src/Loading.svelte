<script>
  export let loading;
</script>

<style>
  .loader-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #fff;
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
  }

  .loader-wrapper .loader {
    height: 80px;
    width: 80px;
  }
  .loader-wrapper.is-active {
    opacity: 0.8;
    z-index: 999;
  }
</style>

<div class="loader-wrapper" class:is-active={loading}>
  <div class="loader is-loading" />
</div>
