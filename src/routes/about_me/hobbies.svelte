<script lang="ts">

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
          description: "I love to climb anything, and a climbing gym lets me climb. I used to use them often, but now I just climb trees and stuff since I'm to busy to go to a gym.",
          image: "",
        },
        {
          name: "Skydiving",
          description: "I did it once and it'd do it again. At first it was very stressful, but then it became relaxing.",
          image: "",
        },
        {
          name: "Biking",
          description: "Was in multiple biking clubs, and used to bike everyday. Now I try to bike everyday, and try to attend bike clubs outside of UConn.",
          image: "",
        },
        {
          name: "Krav Maga",
          description: "For 1.5 years I occasioannly attended a Krav Maga self defense class. I still enjoy sparing every once and a while.",
          image: "",
        },
        {
          name: "Weight Lifting",
          description: "I'm not a serious gym buff but I do enjoy weight lifting and being able to push the weights I can manage. It's especially enjoyable since I know my strength gained in the gym lets me do other physical activites with more confidence.",
          image: ""
        }
      ],
    },
    {
      category: "Art",
      activites: [
        {
          name: "Zine",
          description: "Attended clubs at UConn focused on making magazines and collages. Absolutely love making my own magazines, and I still try to make magazines :)",
          image: "",
        },
        {
          name: "Radio Show",
          description: "UConn has a radio station that students can slot an hour to be a DJ for. I found it a lot of fun to have my own radio show, talk, and play music.",
          image: "",
        },
        {
          name: "Breakdancing",
          description: "Been breakdancing now for 2 years, and try to continue break dancing. Its a little difficult to find locations to dance at, but I still try to dance. Won a very low stake dancing competition, and that was the peak of my dancing :v.",
          image: "",
        },
        {
          name: "Swing dancing",
          description: "Before I did breakdancing I spent 6 months or so dancing to jazz music and enjoyed it, although I found it difficult to its structured nature.",
          image: "",
        },
        {
          name: "Saxaphone",
          description: "Played saxophone since elementary school and enjoy it. I don't play as much as I used to.",
          image: ""
        }
      ],
    },
    {
      category: "Enviroment/Agriculture",
      activites: [
        {
          name: "Beekeeping",
          description: "For a year I was attending bee club, just learning the thoery of bee keeping, then in the last month I attended I finally kept some bees. I love bees, and managing them is rewarding but it takes too much time for me right now so I don't do it for now.",
          image: "",
        },
        {
          name: "Eco Husky",
          description: "An organization at UConn that promotes green activites in life and for the campus to be more green. I still try to support organizations that try to make the world a more envirometnally friendly place.",
          image: "",
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
          <h4>{activity.name}</h4>
          <p id="{activity.name}-desciption" class="description">
            {activity.description}
          </p>

          <img
            src={activity.image}
            alt="activity"
            class="activity-image"
            id="{activity.name}-image"
          />
        </div>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  #hobbies {
    position: absolute;
    height: 250%;
    width: 100%;
    background: linear-gradient(to bottom, #40bfba, #40bf7b);
  }

  #hob-title {
    position:absolute;
    left: 50%;
    transform: translate(-50%);
    margin: 0;
    padding: 0%;
  }

  .category{
    // position: absolute;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 10%;
    padding: 0%;
    float: inline-start;
  }

  .activity{

  }

  .description{

  }

</style>
