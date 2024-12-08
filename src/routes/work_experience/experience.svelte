<script lang="ts">
  import { experiences } from "./experiences";
  import { musicTime, musicController } from "../../common/myLocalStorage";
  import { onMount } from "svelte";

  onMount(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          let n = entry.target.id.split("-");
          let r = "#entry-" + n[n.length - 1];
          let exp: HTMLElement | null = document.querySelector(r);
          exp?.classList.add('in-view')
        }
      })
    })
    
    // Get all the elements with the .animate class applied
    const allElementsToAnimate = document.querySelectorAll(".watch")
    allElementsToAnimate.forEach((element) => {observer.observe(element)})

    // Wait until all items are loaded in the DOM, then apply the anchor
    if (window.location.href.includes("#myExperience")){
      var url = location.href;
      url = url.replace("#myExperience", "#myExperience")
      location.href = url
    }

  })


</script>

<section style="" id="wrapper-div">
  <h1 id="world">World</h1>
  <h2 id="myExperience">My Work Experience</h2>
  {#each Object.entries(experiences) as [key, experience], index}
    <div id={"entry-spacer-" + index} class="spacer watch">
      <div
        id={"entry-" + index}
        class={index % 2 == 0 ? "experience-div left": "experience-div right"}
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
  <!-- Implemented so that in-view, right, and left class gets compiled -->
  <div class="in-view left right"></div>
</section>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Poiret+One&display=swap");
  #wrapper-div {
    margin: 0;
    padding: 0;
    position: absolute;
    background-color: black;
    width: 100vw;
    text-align: center;
    overflow-x: hidden;
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

  @keyframes rightToLeft{
    from {
      right: 100%;
      opacity: 0%;
    }
    to {
      right: 0%;
    }
  }

  @keyframes leftToRight{
    from {
      left: 100%;
      opacity: 0%;
    }
    to {
      left: 0%;
    }
  }

  .experience-div {
    margin: auto;
    padding: 2%;
    border-style: dotted;
    border-color: rgb(150, 150, 150);
    width: 80vw;
    display: flex;
    max-width: 1000px;
    right: 100%;
    position: relative;
  }

  .in-view.left{
    animation: rightToLeft 2.5s ease;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .in-view.right{
    animation: leftToRight 2.5s ease;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }


</style>
