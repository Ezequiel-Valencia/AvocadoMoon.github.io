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
          name: "Biking",
          description:
            "Was in multiple biking clubs, and used to bike every day. At one point I even tried to form my own small biking unit. Now I try to bike every day, and try to find biking organizations outside of UConn.",
          image: dirPrefix + "/bike-trip.jpg",
        },
        {
          name: "Rock Climbing",
          description:
            "I love to climb anything such as walls, trees, boulders, and more. I used to frequent climbing gyms,  however,  due to time constraints my climbing is regulated only to trees.",
          image: dirPrefix + "/cowboy-climb.jpg",
        },
        {
          name: "Skydiving",
          description:  
            "I've skydived once, and it'd do it again. At first,  when falling to earth at terminal velocity it can be stressful, but after a minute it becomes relaxing due to the beautiful view and weightless feeling.",
          image: dirPrefix + "/sky-dive.jpg",
        },
        {
          name: "Krav Maga",
          description:
          "For 1.5 years I occasionally attended a Krav Maga self-defense class. The classes were always fun since the knowledge I learned made me feel more capable and diligent. I still enjoy sparing every once and a while with the hope that it'd start attending lessons again in the future.",
          image: dirPrefix + "/krav_maga.jpg",
        },
        {
          name: "Weight Lifting",
          description:
          "I enjoy weight lifting and pushing the limits of what weights I can exercise with. It's very rewarding since I know my strength gained in the gym lets me do other physical activities with more confidence.",
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
          "Attended clubs at UConn focused on making magazines and collages. I love making my magazines, and I still try to make magazines :)",
          image: dirPrefix + "/Expressionless Cover.png",
        },
        {
          name: "Radio Show",
          description:
          "UConn has a radio station where students can slot an hour to be a DJ. When I still attended the university I found it a lot of fun to have my radio show, talk, and play music.",
          image: dirPrefix + "/radio-show.jpg",
        },
        {
          name: "Breakdancing",
          description:
          "Been breakdancing now for two years, and try to continue break dancing. It's hard to find both time and a place to breakdance, but I still try. In the past, I've won a casual, informal dancing competition, and that was the peak of my dancing :v.",
          image: dirPrefix + "/bboy.jpg",
        },
        {
          name: "Swing dancing",
          description:
          "Before I did breakdancing, I spent six months or so dancing to jazz music and enjoyed it, although I found it difficult due to its structured nature.",
          image: dirPrefix + "/swing-dancing.jpg",
        },
        {
          name: "Saxaphone",
          description:
            "Played saxophone since elementary school and enjoy it. I don't play as much as I used to.",
          image: dirPrefix + "/sax.jpg",
        },
      ],
    },
    {
      category: "Enviroment/Agriculture",
      activites: [
        {
          name: "Beekeeping",
          description:
          "For a year I was attending bee club, just learning the theory of beekeeping, then in the last month I attended, I finally kept some bees. I love bees, and managing them is rewarding, but it takes too much time for me right now so I don't do it for now.",
          image: dirPrefix + "/bees.jpg",
        },
        {
          name: "Eco Husky",
          description:
          "An organization at UConn that promotes green activities in life and for the campus to be more green. I still try to support organizations that try to make the world a more environmentally friendly place now that I've graduated college.",
          image: dirPrefix + "/eco.jpg",
        },
      ],
    }
  ];
</script>

<div id="hobbies">
  <h1 id="hob-title">Freetime spent</h1>
  {#each hobbies as hob, index}
    <div id={hob.category} class="category">
      <h2>{hob.category}</h2>
      {#each hob.activites as activity, index}
        <div id={activity.name} class="activity">
          <table>
            <tr>
              <td>
                <h3>{activity.name}</h3>

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
    background: linear-gradient(to bottom, #339996, #329962, #12693b);
    
  }

  #hob-title {
    margin: auto;
    text-align: center;
    color: white;
  }

  .category {
    // position: absolute;
    margin-left: auto; //aligns div in the center by auto making margins
    margin-right: auto;
    padding-left: 5%;
    margin-top: 10%;
    padding: 0%;
    border-style: solid;
    border-color: white;
    max-width: 1000px;
    width: 80vw;
    // left: 50%;
    // transform: translate(50%);

    // float: inline-start;
  }

  .category h2{
    padding: 2%;
    color: white;
  }

  .activity {
    // height: 100%;
    padding: 2%;
    padding-bottom: 5%;
    overflow: auto;
    color: white;
  }

  .description {
    font-size: large;
    top: 0%;
    color: white;
  }

  .activity-image{
    height: 200px;
    
    // margin-left: 70%;
    float: right;
    max-width: 150px;
    
  }

</style>
