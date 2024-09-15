<script lang="ts">
  import Tabs from "../../common/tabs.svelte";
  import { webRing } from "./WebsInrRing";
  import { importSCSSOptions } from "../../globals"
  import type { WebRing } from "./WebsInrRing";

  const webRingIterable = Object.entries(webRing);
  let activeIndex = 0;
  const icons= [["material-symbols-outlined", "construction"],
    ["material-symbols-outlined", "palette"]
  ]


  function redirctNewTab(e: any, url: string){
    window.open(url, "_blank")
  }

</script>

<head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>



<article style="text-align: center; height:auto;">
  <Tabs iterable={webRingIterable} bind:activeIndex={activeIndex} 
  tabSCSSFileLocation={importSCSSOptions.web_ring} getTabNameFunction={(e) => {return e[0]}}
  icons={icons}>
  </Tabs>
  
  {#each webRingIterable as [key, webList], index}
  {#if activeIndex == index}
  <div style="padding-bottom:5vh;">
    <div style="width: 35vw; margin:auto; border-bottom-style:solid; border-bottom-color:white;">
      <h3 style="font-size: 4vmin;">{key}</h3>
    </div>
  </div>

  {#each webList as web, index}
  <div style="text-align:center; padding-bottom: 5%; height:auto;">
    <div class="content-div" on:mousedown={(e) => {redirctNewTab(e, web.url)}}
      role="tab"
      aria-controls="tabpanel-{index}"
      tabindex="{index}"
    >
      <div style="padding-left:2vw; padding-right: 2vw; margin-top: auto; margin-bottom:auto;">
        <img class="web-image" src={web.imgLocation} alt="Website Cover" />
      </div>
      <div style="text-align: left;">
        <h2 style="font-size: 3.5vmin; padding-right:2vw;">{web.webTitle}</h2>
        <h5 style="font-size: 2.7vmin; padding-right:2vw;">{web.description}</h5>
        <p style="font-size: 2.5vmin; padding-right:2vw;">Thoughts: {web.opinion}</p>
      </div>
    </div>
  </div>
  {/each}
  {/if}
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
    max-width: 800px;
  }

  .web-image{
    border-style:ridge; 
    width: 10vw; 
    height: 15vh; 
    max-height:150px; 
    max-width:150px;
    border-color:white;
  }

  h3{
    color: white;
  }

  h2{
    color: white;
  }

  h5{
    color: white;
  }

  p{
    color: white;
  }

</style>
