<script lang="ts">
  import { experiences } from "./experiences";
  import { musicTime, musicController } from "../../common/myLocalStorage";
</script>

<div id="wrapper-div">
  <h1 id="world">World</h1>
  <h2>My Work Experience</h2>
  {#each Object.entries(experiences) as [key, experience], index}
    <div class="spacer">
      <div
        class="experience-div"
        on:mousedown={(e) => {
          if($musicController){
            musicTime.updateTimeStamp()
          }
          location.href = experience.redirect;
        }}
        aria-controls="tab-index-{index}"
        role="tab"
        tabindex={index}
      >
        <p class="job-time">{experience.time}</p>
        <div class="text-div">
          <h3 class="company-name text">{experience.company}</h3>
          <h5 class="job-title text">{experience.jobTitle}</h5>
          <p class="job-description text">{experience.description}</p>
        </div>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Poiret+One&display=swap");
  #wrapper-div {
    margin: 0;
    padding: 0;
    position: absolute;
    background-color: black;
    width: 100vw;
    text-align: center;
  }

  #world {
    font-family: "Poiret One", cursive;
    color: white;
    padding-bottom: 50%;
    font-size: 500%;
  }

  h2 {
    color: white;
  }
  .spacer {
    padding: 5%;
  }

  .experience-div {
    margin: auto;
    padding: 2%;
    border-style: dotted;
    border-color: rgb(150, 150, 150);
    width: 80vw;
    display: flex;
    max-width: 1000px;
  }

  .text-div {
    text-align: center;
    width: 100%;
  }

  .text {
    $margin-percent: 10%;
    color: white;
    margin-left: $margin-percent;
    margin-right: $margin-percent;
  }

  .job-time {
    color: white;
    writing-mode: vertical-lr;
  }
</style>
