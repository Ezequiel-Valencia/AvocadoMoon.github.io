<script lang="ts">
  import { onMount } from "svelte";
  import { technology_icons } from "./education";

    onMount(() => {
        const mask: HTMLElement | null = document.querySelector(".black-over-top");
        document.addEventListener('pointermove', (pos) => {
            let div = pos.target as HTMLDivElement;
            let rect = div.getBoundingClientRect()
            let x = pos.clientX - rect.left;
            let y = pos.clientY - rect.top;
            if (0 <= rect.top){
                mask?.style.setProperty('--mouse-x', x + 'px');
                mask?.style.setProperty('--mouse-y', y + 'px');
            } else{
                mask?.style.setProperty('--mouse-x', 200 + '%');
                mask?.style.setProperty('--mouse-y', 200 + '%');
            }
            
            
        })
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
            <img class="img" src="/Education/UConn.JPG" alt="Statue">
        </article>
        <article class="education-article">
            <img class="img" src="https://thesquare.gent/wp-content/uploads/2018/09/large_wIX3ZhzVucOdRFpxCgEU8IA_XviqoYYqm6sjdvaS0dM.jpeg" alt="Statue">
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
                    {#each technology_icons as icon}
                        <img style="height: 5vmin; width: 5vmin;" src={icon} alt="Technology Icon">
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
        background-color: rgb(0, 0, 0);
        position: absolute;
        width: 100vw;
        height: 100%;
        z-index: 2;
        mask-image: radial-gradient(
            circle at var(--mouse-x) var(--mouse-y),
             rgba(255, 255, 255, 0) 2vmin, rgb(255, 255, 255) 40vmin
        );
        cursor: url("/Education/book-cursor.png"), auto;
    }

    .degree {
    font-family: "Dancing Script", cursive;
    font-size: 2em;
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

  .img {
    max-height: 45vh;
    max-width: 35vw;
    border-style: solid;
    border-color: white;
    border-width: 2px;
  }

  article {
    height: auto;
    width: auto;
    display: flex;
  }

</style>
