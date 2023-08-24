<script lang="ts">
  const dirPrefix = "/about_me";
  type Activites = {
    name: string;
    description: string;
    image: string;
  };

  const hobbies: { category: string; activites: Activites[] }[] = [
    {
      category: "Atheletic",
      activites: [
        {
          name: "Rock Climbing",
          description:
            "I love to climb anything, and a climbing gym lets me climb. I used to use them often, but now I just climb trees and stuff since I'm to busy to go to a gym.",
          image: dirPrefix + "/cowboy-climb.jpg",
        },
        {
          name: "Skydiving",
          description:
            "I did it once and it'd do it again. At first it was very stressful, but then it became relaxing.",
          image: dirPrefix + "/sky-dive.jpg",
        },
        {
          name: "Biking",
          description:
            "Was in multiple biking clubs, and used to bike everyday. Now I try to bike everyday, and try to attend bike clubs outside of UConn.",
          image: dirPrefix + "/bike-trip.jpg",
        },
        {
          name: "Krav Maga",
          description:
            "For 1.5 years I occasioannly attended a Krav Maga self defense class. I still enjoy sparing every once and a while.",
          image: dirPrefix + "/krav_maga.jpg",
        },
        {
          name: "Weight Lifting",
          description:
            "I'm not a serious gym buff but I do enjoy weight lifting and being able to push the weights I can manage. It's especially enjoyable since I know my strength gained in the gym lets me do other physical activites with more confidence.",
          image: dirPrefix + "/weight lift.jpg",
        },
      ],
    },
    {
      category: "Art",
      activites: [
        {
          name: "Zine",
          description:
            "Attended clubs at UConn focused on making magazines and collages. Absolutely love making my own magazines, and I still try to make magazines :)",
          image: "",
        },
        {
          name: "Radio Show",
          description:
            "UConn has a radio station that students can slot an hour to be a DJ for. I found it a lot of fun to have my own radio show, talk, and play music.",
          image: dirPrefix + "/radio-show.jpg",
        },
        {
          name: "Breakdancing",
          description:
            "Been breakdancing now for 2 years, and try to continue break dancing. Its a little difficult to find locations to dance at, but I still try to dance. Won a very low stake dancing competition, and that was the peak of my dancing :v.",
          image: dirPrefix + "/bboy.jpg",
        },
        {
          name: "Swing dancing",
          description:
            "Before I did breakdancing I spent 6 months or so dancing to jazz music and enjoyed it, although I found it difficult to its structured nature.",
          image: dirPrefix + "/swing-dancing.jpg",
        },
        {
          name: "Saxaphone",
          description:
            "Played saxophone since elementary school and enjoy it. I don't play as much as I used to.",
          image: "",
        },
      ],
    },
    {
      category: "Enviroment/Agriculture",
      activites: [
        {
          name: "Beekeeping",
          description:
            "For a year I was attending bee club, just learning the thoery of bee keeping, then in the last month I attended I finally kept some bees. I love bees, and managing them is rewarding but it takes too much time for me right now so I don't do it for now.",
          image: dirPrefix + "/bees.jpg",
        },
        {
          name: "Eco Husky",
          description:
            "An organization at UConn that promotes green activites in life and for the campus to be more green. I still try to support organizations that try to make the world a more envirometnally friendly place.",
          image: dirPrefix + "/eco.jpg",
        },
      ],
    },
    {
      category: "Community",
      activites: [
        {
          name: "",
          description: "",
          image: "",
        },
      ],
    },
  ];
</script>

<div id="hobbies">
  <h1 id="hob-title">Freetime spent</h1>
  {#each hobbies as hob, index}
    <div id={hob.category} class="category">
      <h2>{hob.category}</h2>
      {#each hob.activites as activity, index}
        <div id={activity.name} class="activity">
          <h3>{activity.name}</h3>
          <table>
            <tr>
              <td>
                <p id="{activity.name}-desciption" class="description">
                  {activity.description}
                </p>
              </td>

              <td>
                <img
              src={activity.image}
              alt="activity"
              class="activity-image"
              id="{activity.name}-image"
            />
              </td>

            </tr>

          </table>
          
        </div>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  // https://www.geeksforgeeks.org/how-to-wrap-the-text-around-an-image-using-html-and-css/#
  #hobbies {
    overflow: auto; //make stuff that overflows to make the div expand
    width: 100%;
    background: linear-gradient(to bottom, #40bfba, #40bf7b);
  }

  #hob-title {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    margin: 0;
    padding: 0%;
  }

  .category {
    // position: absolute;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 10%;
    padding: 0%;
    border-style: solid;

    // float: inline-start;
  }

  .category h2{
    padding: 2%;
  }

  .activity {
    // height: 100%;
    padding: 2%;
    overflow: auto;
  }

  .description {
    font-size: large;
    top: 0%;
  }

  .activity-image{
    height: 200px;
    
    // margin-left: 70%;
    float: right;
    
  }

</style>
