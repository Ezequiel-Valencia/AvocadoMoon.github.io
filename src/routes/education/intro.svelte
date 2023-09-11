<script lang="ts">
  import { onMount } from "svelte";

  //
  var isVisible = true;
  onMount(() => {
    function isElementInViewport(el: any) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function handleScroll() {
      const element = document.querySelector(".animate-me");
      if (isElementInViewport(element)) {
        element?.classList.add("animate");
        window.removeEventListener("scroll", handleScroll);
      }
    }

    window.addEventListener("scroll", handleScroll);
  });
</script>

<div id="intro-div">
  <div style="width: 80vw; height: 80vh; text-align:center; margin:auto; position:relative; top:25%;">
    <article id="intro-article">
      <img class="img" src="/Education/dark library.jpg" alt="Library">
      <h2 style="margin-top:10vh; margin-left:5vw; font-size:5em; font-family: 'Dancing Script', cursive;">Education</h2>
    </article>
  </div>
    {#if isVisible}
    <div class="animate-me"> </div>
    {/if}
</div>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
  #intro-div{
    background-color: #d1b698;
    height: 100vh;
    width: 100vw;
  }

  #intro-article{
    height: auto;
    width: auto;
    display: flex;
  }

  .img{
    max-height: 45vh;
    max-width: 35vw;
    border-style: solid;
    border-color: white;
    border-width: 2px;
  }

</style>
