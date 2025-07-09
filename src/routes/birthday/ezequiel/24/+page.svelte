<script lang="ts">
  import Menu from "../../../../common/menu.svelte";

</script>



<section id="main-div">
  <Menu songVolumeLevel=.3 songPath="https://files.catbox.moe/way98y.mp3" songName="Zora's Domain - Day (Breath of the Wild)"></Menu>

  <div id="text-div" style="">
    <h1>You've been invited to Ezequiel's 24th birthday party:</h1>
    <div style="width: 100%; margin:auto;">
      <img style="" src="/birthday/cat-jumping.gif" alt="cat-jumping">
      <br>
      <i>*Let's Go*</i>
      <br>
      <br>
    </div>
    <div style="width: 60vw; margin:auto; margin-bottom:10%;">
      <h2>The Plan:</h2>
      For my birthday I either want to attend the Hartford science center or an 
      aquarium, but I'm not sure which one yet. Please help me decide by voting on it
      in this google form.
      <i>
        <h4>
          <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfSjg2SIMJ8Xg16Gh2gmagu_yZ762YdlYyKE1bWGqWKqWok3Q/viewform?usp=dialog">
            The Form
          </a>
        </h4>
      </i>
      The date for either event will be July 19th, Saturday, and more details will
      be given once everyone casts their votes. See you there :)

    </div>
    

    <audio src=""></audio>
  
  </div>
  
</section>

<style lang="scss">
  #main-div {
    background-image: url("/birthday/abstract-ocean.jpg");
    height: auto;
    min-height: 100vh;
    width: 100vw;
    align-items: center;
    top: 0;
    left: 0;
    position: absolute;
  }

  #text-div{
    text-align: center;
    background-color: rgba(255, 255, 255, 0.911);
    max-width: 80vw;
    margin: auto;
    border-radius: 5px;
    position: relative;
    margin-top: 10%;
    margin-bottom: 1%;
    padding: 1%;
  }

  h1{
    color: rgb(0, 0, 0);
  }

 


</style>
