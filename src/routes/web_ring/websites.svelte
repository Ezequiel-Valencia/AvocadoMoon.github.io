<script lang="ts">
  import { webRing } from "./WebsInrRing";
  import type { WebRing } from "./WebsInrRing";

  webRing;


  function redirctNewTab(e: any, url: string){
    window.open(url, "_blank")
  }

</script>




<article style="text-align: center; height:auto;">
  {#each Object.entries(webRing) as [key, webList], index}

  <div style="padding-bottom:5vh;">
    <div style="width: 35vw; margin:auto; border-bottom-style:solid;">
      <h3 style="font-size: 2em;">{key}</h3>
    </div>
  </div>

  {#each webList as web, index}
  <div style="padding-bottom: 5%; height:auto;">
    <div class="content-div" on:mousedown={(e) => {redirctNewTab(e, web.url)}}
      role="tab"
      aria-controls="tabpanel-{index}"
      tabindex="{index}"
    >
      <div style="padding-left:2vw; padding-right: 2vw; margin-top: auto; margin-bottom:auto;">
        <img style="border-style:ridge; width: 10vw; height:10vw;" src={web.imgLocation} alt="Website Cover" />
      </div>
      <div style="text-align: left;">
        <h2 style="font-size: 2em;">{web.webTitle}</h2>
        <h5 style="font-size: 1em;">{web.description}</h5>
        <p style="font-size: .9em;">Opinion: {web.opinion}</p>
      </div>
    </div>
  </div>
  {/each}
  {/each}
</article>




<style lang="scss">
  .content-div{
    background-color:rgba(0, 0, 0, 0.801);
    display:flex; 
    height:max-content; 
    border-style:double; 
    border-color:indigo; 
    width:60vw; 
    text-align:center; 
    margin:auto;
  }

</style>
