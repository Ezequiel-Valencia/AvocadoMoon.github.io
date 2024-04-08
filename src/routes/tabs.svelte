<script lang="ts">
  import { onMount } from "svelte";

    export let iterable: Iterable<any>;
    export let activeIndex: number;
    export let tabSCSSFileLocation: string;
    export let getTabNameFunction: (para: any) => string;

    // https://flowbite.com/docs/components/tabs/#typescript
    // Tailwind classes for generic CSS
    const tabCSSClass = "inline-block p-5 border-b-2 rounded-t-lg"
    const tabContainerCSSClass = "flex flex-wrap -mb-px text-sm font-medium text-center"
    const listClass = "flex flex-wrap -mb-px text-sm font-medium text-center";

    //comment vite-ignore is used to suppress dynamic import warnings
    onMount(() => {
        import(/* @vite-ignore */ tabSCSSFileLocation /* @vite-ignore */)
    })

</script>


<div id="tabs" class="{tabContainerCSSClass}" style="text-align: center;" role="tablist">
    <ul class="{listClass}" data-tabs-toggle="#stuffs" style="margin: auto; text-align:center; padding:0%;" role="tablist">
      {#each iterable as currentObject, index}
        <li class="me-2" style="margin: auto; list-style-type:none;" role="presentation"> 
          <button on:click={
            (e) => {activeIndex = index}
          } 
          class="{tabCSSClass} {activeIndex == index ? "selected_tab" : "tab"}" 
          role="tab" id="{getTabNameFunction(currentObject)}">{getTabNameFunction(currentObject)}
        </button>
        </li>
      {/each}
    </ul>
</div>

