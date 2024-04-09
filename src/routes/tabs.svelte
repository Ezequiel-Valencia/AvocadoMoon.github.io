<script lang="ts">
  import { onMount } from "svelte";
  import { importSCSSOptions } from "../globals"

    export let iterable: Iterable<any>;
    export let activeIndex: number;
    export let tabSCSSFileLocation: importSCSSOptions;
    export let getTabNameFunction: (para: any) => string;
    export let icons: Array<any> = [];

    // https://flowbite.com/docs/components/tabs/#typescript
    // Tailwind classes for generic CSS
    const tabCSSClass = "inline-block p-5 border-b-2 rounded-t-lg"
    const tabContainerCSSClass = "flex flex-wrap -mb-px text-sm font-medium text-center"
    const listClass = "flex flex-wrap -mb-px text-sm font-medium text-center";

    //comment vite-ignore is used to suppress dynamic import warnings

    onMount(() =>{
      if(tabSCSSFileLocation === importSCSSOptions.about_me){
        import(`./about_me/tabs.scss`)
      } else if(tabSCSSFileLocation === importSCSSOptions.personal_projects){
        import(`./personal_projects/tabs.scss`)
      } else{
        import(`./web_ring/tabs.scss`)
      }
    })
    

</script>


<div id="tabs" class="{tabContainerCSSClass}" style="text-align: center;" role="tablist">
    <ul class="{listClass}" data-tabs-toggle="#stuffs" style="margin: auto; text-align:center; padding:0%;" role="tablist">
      {#each iterable as currentObject, index}
        <li class="me-2" style="margin: auto; list-style-type:none;" role="presentation"> 
          <button on:click={
            (e) => {activeIndex = index}
          } 
          class="button {tabCSSClass} {activeIndex == index ? "selected_tab" : "tab"}" 
          role="tab" id="{getTabNameFunction(currentObject)}">
          {#if icons.length === 0}
            {getTabNameFunction(currentObject)}
          {:else}
            <span class="icon {icons[index][0]}">{icons[index][1]}</span>
          {/if}
        </button>
        </li>
      {/each}
    </ul>
</div>

<style lang="scss">
  .icon{
    font-size: 5vmin !important;
  }
</style>

<!-- <svg preserveAspectRatio="xMinYMax meet" height="10%" width="50" viewBox="0 0 512 512">
  <path fill="#ffffff" d="M78.6 5C69.1-2.4 55.6-1.5 47 7L7 47c-8.5 8.5-9.4 22-2.1 31.6l80 104c4.5 5.9 11.6 9.4 19 9.4h54.1l109 109c-14.7 29-10 65.4 14.3 89.6l112 112c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-112-112c-24.2-24.2-60.6-29-89.6-14.3l-109-109V104c0-7.5-3.5-14.5-9.4-19L78.6 5zM19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L233.7 374.3c-7.8-20.9-9-43.6-3.6-65.1l-61.7-61.7L19.9 396.1zM512 144c0-10.5-1.1-20.7-3.2-30.5c-2.4-11.2-16.1-14.1-24.2-6l-63.9 63.9c-3 3-7.1 4.7-11.3 4.7H352c-8.8 0-16-7.2-16-16V102.6c0-4.2 1.7-8.3 4.7-11.3l63.9-63.9c8.1-8.1 5.2-21.8-6-24.2C388.7 1.1 378.5 0 368 0C288.5 0 224 64.5 224 144l0 .8 85.3 85.3c36-9.1 75.8 .5 104 28.7L429 274.5c49-23 83-72.8 83-130.5zM56 432a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"/>
</svg> -->

