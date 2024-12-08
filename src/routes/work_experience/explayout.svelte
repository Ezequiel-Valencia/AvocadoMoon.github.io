<script lang="ts">
  import type { WorkExperience } from "./experiences";
  import {experiencesSong} from "./experiences"
  import { musicController, musicTime } from "../../common/myLocalStorage";
  import { onMount } from "svelte";
  import { percentLoaded } from "./experiences";

  export var experience: WorkExperience;
  export var description: string[];
  export var imgSrc: string;
  export let takeaway: string;


  let hoveredTech = ''

  function displayIconsDescription(pos: MouseEvent){
        const hiddenElement = document.elementFromPoint(pos.clientX, pos.clientY)
        if (hiddenElement != null && hiddenElement.classList.contains("tech")){
        let n = hiddenElement.id.split("-");
            hoveredTech = n[1];
        } else {
            hoveredTech = "";
        }
    }


  onMount(() => {
    if($musicController){
      musicTime.setAudioTagTime()
    }
    document.addEventListener("pointermove", (e) => {
            displayIconsDescription(e)
        })
  })
</script>

<div id="wrapper">
  <button style="" on:click={(e) => {
    if($musicController){
      musicTime.updateTimeStamp()
    }
    location.href = "/work_experience#myExperience"
  }}> 
    <nav>
        <h2>
          Return
        </h2>
      </nav>
  </button>
  
  <div id="right-wrapper">
    
    <div id="text-wrapper-div">
      <h1 class="text">{experience.company}</h1>
      <h2 class="text">{experience.jobTitle}</h2>
      <h2 class="text">Technologies: 
        {#each experience.technologies as tech, index}
          <span id={"description-" + tech.name} class="tech description-holder">
              {#if tech.name == hoveredTech}
                  <div style="z-index: 3;" class="description">
                      <h3 style="text-align:center; font-family: 'Times New Roman', Times, serif;">{tech.name}</h3>
                      <p style="text-align: center;">{tech.description}</p>
                  </div>
              {/if}
              <img id="img-{tech.name}" class="tech" style="height: 2em; position:static; {tech.name == "SQL" ? "filter: invert(1);" : ""}" src={tech.icon} alt={tech.name}>
          </span>
        {/each}
      </h2>
      <h3 class="text">{experience.time}</h3>
      <h5 class="text">Key Takeaway: {takeaway}</h5>
      <img class="job-img" src={imgSrc} alt="Work Related" />
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
    font-size: 1.4em;
  }

  nav h2{
    margin-top: 5%;
    margin-left: 0;
    margin-right: 0;
    background-color: transparent;
  }

  nav h2{
    text-decoration: none;
    color: white;
  }

  button{
    border-right: #535353;
    border-right-style:ridge;
    border-left: none;
    border-top: none;
    border-bottom: none;
    background-color: transparent;
  }

  button:hover{
    background: #53535375;
  }

  .job-img {
    max-height: 15vw;
    max-width: 40%;
    float: right;
    padding-right: 5%;
  }

  .description {
        z-index: 3;
        position: absolute;
        text-align: center;
        margin: auto;
        padding-right: 1.5%;
        padding-left: 1.5%;
        opacity: 1;
        height: auto;
        width: auto;

        background-color: rgb(0, 0, 0);
        border-style: solid;
        border-color: rgb(255, 255, 255);
  }

  
</style>
