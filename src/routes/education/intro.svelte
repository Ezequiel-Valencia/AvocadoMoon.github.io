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

<div>
    {#if isVisible}
    <div class="animate-me"> </div>
    {/if}
</div>

<style lang="scss">
</style>
