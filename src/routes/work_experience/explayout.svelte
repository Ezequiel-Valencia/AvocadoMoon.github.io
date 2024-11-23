<script lang="ts">
  import type { WorkExperience } from "./experiences";
  import {experiencesSong} from "./experiences"
  import { musicController, musicTime } from "../../common/myLocalStorage";
  import { onMount } from "svelte";
  export var experience: WorkExperience;
  export var description: string[];
  export var imgSrc: string;
  export let takeaway: string;

  onMount(() => {
    if($musicController){
      musicTime.setAudioTagTime()
    }
  })
</script>

<div id="wrapper">
  <nav
  on:click={(e) => {
    if($musicController){
      musicTime.updateTimeStamp()
    }
    location.href = "/work_experience#myExperience"
  }}>
    <h2>
      Return
    </h2>
  </nav>
  <div id="right-wrapper">
    
    <div id="text-wrapper-div">
      <h1 class="text">{experience.company}</h1>
      <h2 class="text">{experience.jobTitle}</h2>
      <h3 class="text">{experience.time}</h3>
      <h5 class="text">Key Takeaway: {takeaway}</h5>
      <img src={imgSrc} alt="Work Related" />
      {#each description as paragraph }
        <p class="text">{paragraph}</p>
      {/each}
    </div>
  </div>

  {#if $musicController}
    <audio id="song" src="{experiencesSong}" autoplay loop></audio>
  {/if}
  
</div>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Poiret+One&display=swap');
  #wrapper {
    height: auto;
    min-height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    background-color: black;
    display: flex;
  }

  #right-wrapper{
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-size: 40px 40px;
  }

  .text {
    padding-left: 5%;
    width: 60vw;
    max-width: 500px;
  }

  #text-wrapper-div{
    width: 100%;
    max-width: 1080px;
  }

  #text-wrapper-div h2 {
    color: rgb(190, 190, 190);
  }

  h1, h2, h3, h5, p{
    background-color: black;
  }

  h3 {
    color: gray;
  }

  h5{
    color: rgb(173, 173, 173);
  }

  p {
    color: white;
  }

  h1 {
    color: white;
  }

  nav {
    writing-mode: vertical-lr;
    margin-bottom: unset;
    overflow: hidden;
    height: unset;
    width: 2em;
    padding: .2em;
    border-bottom: unset;
    border-right: 1px solid #535353;
    font-size: 1.4em;
  }

  nav h2{
    margin-top: 5%;
    margin-left: 0;
    margin-right: 0;
  }

  nav h2{
    text-decoration: none;
    color: white;
  }

  img {
    max-height: 15vw;
    max-width: 40%;
    float: right;
    padding-right: 5%;
  }

  
</style>
