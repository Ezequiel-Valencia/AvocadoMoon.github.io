<script lang="ts">
    import { exp } from './explination';
    import { AccordionItem, Accordion } from 'flowbite-svelte'; //https://flowbite-svelte.com/docs/components/accordion
</script>





<article id="accordion">
    <Accordion 
    inactiveClass="text-gray-700 dark:text-gray-400 hover:bg-gray-100 hover:dark:bg-gray-800"
    activeClass="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800">
      {#each exp as panel}
      <div class="accord-item">
        <AccordionItem borderClass="border-l border-r group-first:border-t" 
        activeClass="border-gray-300"
        defaultClass="flex items-center justify-between w-full font-medium text-left group-first:rounded-t-xl border-gray-200 dark:border-gray-700">
          <span slot="header">{panel.header}</span>
          <p class="explanation">
            {@html panel.explanation}
          </p>
        </AccordionItem>
      </div>
      {/each}
  
    </Accordion>
</article>



<style lang="scss">
    .accord-item {
    margin-left: auto;
    margin-right: auto;
    width: 80vw;
    max-width: 1000px;
    background-color: gray;
  }

  .explanation {
    color: black;
  }
</style>
