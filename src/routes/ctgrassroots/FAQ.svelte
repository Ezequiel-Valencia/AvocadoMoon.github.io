<script lang="ts">
    import { exp } from './explination';
    import { AccordionItem, Accordion } from 'flowbite-svelte'; //https://flowbite-svelte.com/docs/components/accordion
</script>





<article id="accordion">
    <Accordion>
      {#each exp as panel}
      <div class="accord-item">
        <AccordionItem>
          <span slot="header">{panel.header}</span>
          <p class="explination">
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
  }
</style>
