<script lang="ts">
  import { onMount } from "svelte";

  //
  var isVisible = true;
  onMount(() => {
    function isElementInViewport(el: any) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function handleScroll() {
      const element = document.querySelector(".animate-me");
      if (isElementInViewport(element)) {
        element?.classList.add("animate");
        window.removeEventListener("scroll", handleScroll);
      }
    }

    window.addEventListener("scroll", handleScroll);
  });
</script>

<div id="intro-div">
  <div style="height: 100vh;">
    <div class="content-div" style="top: 25%; margin-bottom:25%">
      <article>
        <img class="img" src="/Education/dark library.jpg" alt="Library" />
        <div>
          <h2 class="right-side-text" style="margin-bottom: 2vh;">Education</h2>
          <p class="right-side-text" style="margin-top:0; font-size:2.5em;">
            "I think wanting to learn stuff is neat." - me
          </p>
        </div>
      </article>
    </div>

    <div class="content-div">
      <article>
        <div>
          <h3 class="degree">Bachelors Degree In Cybersecurity</h3>
          <h2 class="institution">University of Connecticut</h2>
          <p style="margin: 4%;">
            Getting my education in Cybersecurity was one of the best decisions
            I've made. The subject requires a grasp on all CS subjects for
            setting a secure entripise system. That is network, OS, hardware, front-end,
            back-end, and CI/CD security. With this knowledge I can both excel in personal projects
            and in the work field.
          </p>
        </div>
        <img class="img" src="/Education/UConn.JPG" alt="Statue">
      </article>
    </div>
  </div>
</div>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap");
  #intro-div {
    height: auto;
    width: 100vw;
  }

  article {
    height: auto;
    width: auto;
    display: flex;
  }
  .content-div {
    width: 80vw;
    height: 80vh;
    text-align: center;
    margin: auto;
    position: relative;
  }

  .degree {
    font-family: "Dancing Script", cursive;
    font-size: 2em;
  }

  .right-side-text {
    margin-top: 10vh;
    margin-left: 5vw;
    text-align: left;
    // margin-bottom: 0;
    font-size: 5em;
    font-family: "Dancing Script", cursive;
  }

  .img {
    max-height: 45vh;
    max-width: 35vw;
    border-style: solid;
    border-color: white;
    border-width: 2px;
  }
</style>
