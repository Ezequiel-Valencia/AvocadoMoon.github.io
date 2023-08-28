<script lang="ts">
  import Me from "./me.svelte";
  import Hobbies from "./hobbies.svelte";
  import Menu from "../menu.svelte";
</script>

<div id="main-div">
  <Menu email=""></Menu>
  <Me></Me>

  <Hobbies></Hobbies>
  

</div>

<!-- https://www.youtube.com/watch?v=vJNVramny9k -->
<!-- Squircle is a lot easier so that for now -->

<style lang="scss">

  #main-div {
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    padding: 0%;
    position: absolute;
  }

</style>
