<script lang="ts">
  import { onMount } from "svelte";
  import { technology_learned, createBookCheckout } from "./education";

  let mask: HTMLElement | null;
  $: iconIndex = -1;
  let bookCheckout = createBookCheckout()

  function moveGradient(mask: HTMLElement, pos: MouseEvent){
    let div = pos.target as HTMLDivElement;
    let rect = div.getBoundingClientRect()
    let x = pos.clientX - rect.left;
    let y = pos.clientY - rect.top;
    mask.style.setProperty('--mouse-x', x + 'px');
    mask.style.setProperty('--mouse-y', y + 'px');
  }

  function hideGradient(mask: HTMLElement){
    mask.style.setProperty('--mouse-x', '200%');
    mask.style.setProperty('--mouse-y', '200%');
  }

  function displayIconsDescription(mask: HTMLElement, pos: MouseEvent){
    mask.style.pointerEvents = 'none';

    const hiddenElement = document.elementFromPoint(pos.clientX, pos.clientY)
    if (hiddenElement != null && hiddenElement.classList.contains("tech")){
      let n = hiddenElement.id.split("-");
      iconIndex = Number(n[n.length - 1]);
    } else {
      iconIndex = -1;
    }

    mask.style.pointerEvents = 'auto';
  }

  function updateMaskHeight(){
    const education_content: HTMLElement | null = document.querySelector(".education-content")
    mask?.style.setProperty('--var-height', education_content?.clientHeight + "px")
    return true
  }

  
    onMount(() => {
        mask = document.querySelector(".black-over-top");
        let inMask = false;
        document.addEventListener('mousemove', (pos) => {
          if (mask != null && bookCheckout.read() && inMask){
            displayIconsDescription(mask, pos)
            moveGradient(mask, pos)
          } else if (mask != null){
            hideGradient(mask)
          }
        })

        mask?.addEventListener("mouseleave", (e) => {
          inMask = false;
        })

        mask?.addEventListener("mouseenter", (e) => {
          inMask = true;
        })

        updateMaskHeight()
        window.onresize = updateMaskHeight
    })
</script>


<section id="all-education-content">
    <div class="black-over-top"></div>
    <div class="education-content">
        <article class="education-article">
            <div>
                <h3 class="degree">Bachelors Degree In Cybersecurity</h3>
                <h2 class="institution">University of Connecticut</h2>
                <h5>GPA: 3.7</h5>
                <p style="margin: 4%;">
                    Getting my education in Cybersecurity was one of the best decisions
                    I've made. The subject requires a grasp on all CS subjects for
                    setting a secure enterprise system. That is network, OS, hardware, front-end,
                    back-end, and CI/CD security. With this knowledge I can both excel in personal projects
                    and in the work field.
                </p>
            </div>
            <img class="institute-img" src="/Education/UConn.JPG" alt="Statue">
        </article>
        <article class="education-article">
            <img class="institute-img" src="https://thesquare.gent/wp-content/uploads/2018/09/large_wIX3ZhzVucOdRFpxCgEU8IA_XviqoYYqm6sjdvaS0dM.jpeg" alt="Statue">
            <div>
                <h3 class="degree">Self Taught Expert</h3>
                <h2 class="institution">The Internet</h2>
                <h5>Googling Precision and Accuracy (GPA): 99/100</h5>
                <p style="margin: 4%;">
                    My degree is simply a preamble to all the learning it'll continue to do for
                    the rest of my life. Constantly self-teaching by finding projects to act as
                    vehicles to drive my motivation through rough patches of complicated technologies.
                </p>
                <div style="display: flex; height:auto; flex-wrap:wrap;">
                    {#each technology_learned as icon, index}
                          <div id={"holder-" + index} class="tech image-holder">
                            {#if index == iconIndex && updateMaskHeight()}
                              <div id={"description-" + index} class="tech description-holder">
                                <div class="description">
                                  <h3 style="font-family: 'Times New Roman', Times, serif;">{icon.iconName}</h3>
                                  <ul style="text-align: left; font-family:'Times New Roman', Times, serif">
                                    {#each icon.projects as project}
                                      <li>{project}</li>
                                    {/each}
                                  </ul>
                                </div>
                              </div>
                            {/if}
                            <img id={"tech-icon-" + index} class="tech tech-icons" style="height: 5vmin; width: 5vmin;" 
                            src={icon.icon} alt="Technology Icon">
                        </div>
                    {/each}
                </div>
            </div>
        </article>
    </div>
</section>



<style lang="scss">
    #all-education-content{
        height: auto;
        width: auto;
        text-align: center;
    }
    .black-over-top{
        --mouse-x: 150%;
        --mouse-y: 150%;
        --var-height: 100%;
        background-color: rgb(0, 0, 0);
        position: absolute;
        width: 100vw;
        height: var(--var-height);
        z-index: 2;
        mask-image: radial-gradient(
            circle at var(--mouse-x) var(--mouse-y),
             rgba(255, 255, 255, 0) 2vmax, rgb(255, 255, 255) 40vmax
        );
    }

    .degree {
    font-family: "Dancing Script", cursive;
    font-size: 2em;
    color: white;
  }

    h2, p, h3, h5{
        color: white;
    }

  .education-content {
    padding-top: 10%;
    padding-bottom: 10%;
    width: 90vw;
    height: auto;
    text-align: center;
    margin-left: 5vw;
    margin-right: 5vw;
    position: absolute;
    z-index: 1;
  }

  .education-article {
    padding-top: 10%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }

  .institute-img {
    max-height: 45vh;
    max-width: 35vw;
    border-style: solid;
    border-color: white;
    border-width: 2px;
    z-index: 10;
  }

  .image-holder {
    z-index: 10;
    padding: 2vmin;
    position: relative;
    display: table;
    caption-side: top; //https://stackoverflow.com/questions/21240814/how-to-position-a-div-vertically-above-another-div-when-in-the-code-the-divs-are
  }

  .description, h3 {
    color: black;
  }

  .description {
    z-index: 3;
    position: absolute;
    text-align: center;
    // color: black;
    margin: auto;
    padding-right: 20%;
    opacity: 1;
    height: auto;
    width: auto;
    bottom: 100%;
    // right: 5%;
    background-color: rgb(138, 98, 53);
    border-style: solid;
    border-color: rgb(41, 23, 0);
  }

  

  article {
    height: auto;
    width: auto;
    display: flex;
  }

</style>
