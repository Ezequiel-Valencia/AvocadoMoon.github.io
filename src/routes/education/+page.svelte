<script lang="ts">
  import Menu from '../../common/menu.svelte';
  import Education from './education.svelte';
  import Intro from './intro.svelte';

  let bookCheckedOut = $state(false);
</script>

<svelte:head>
  <title>Education</title>
</svelte:head>

<div id="main-div" class:book-cursor={bookCheckedOut}>
  <Menu
    songVolumeLevel=".3"
    songPath="https://files.catbox.moe/p5bsgp.mp3"
    songName="Mozart Symphony 40"
  ></Menu>
  <h1 class="visually-hidden">Education</h1>
  <Intro bind:bookCheckedOut></Intro>
  <Education {bookCheckedOut}></Education>
</div>

<style lang="scss">
  #main-div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    background-color: #523f29;
  }

  /* Hot-spot numbers place the cursor's click point on the book's corner. */
  .book-cursor {
    cursor:
      url('/Education/book-cursor.png') 28 23,
      auto;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
</style>
