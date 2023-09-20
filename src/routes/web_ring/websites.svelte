<script lang="ts">
  import { webRing } from "./WebsInrRing";

  webRing;
</script>




<article style="text-align: center;">
  {#each webRing as web, index}
    <div style="border-style:double; border-color:indigo; width:60vw; text-align:center; margin:auto;">
      <h2>{web.webTitle}</h2>
      <img src={web.imgLocation} alt="Website Cover" />
      <h5>{web.description}</h5>
      <p>{web.opinion}</p>
    </div>
  {/each}
</article>




<style lang="scss">
</style>
