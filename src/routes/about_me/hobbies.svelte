<script lang="ts">
  import { hobbies } from './activites';
  import Tabs from '../tabs.svelte';
  import { importSCSSOptions } from "../../globals"

  let activeIndex = 0;
  let icons = [["material-symbols-outlined", "fitness_center"],
  ["material-symbols-outlined", "brush"], ["material-symbols-outlined", "forest"]]
  
</script>

<head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
</head>

<div id="hobbies">
  <Tabs iterable={hobbies} bind:activeIndex={activeIndex} 
  tabSCSSFileLocation={importSCSSOptions.about_me}
  getTabNameFunction={(e) => {return e.category}} icons={icons}>

  </Tabs>
  <!-- <h1 id="hob-title">Freetime spent</h1> -->
  {#each hobbies as hob, index}
    {#if activeIndex == index}
     <div id={hob.category} class="category">
      <h2>{hob.category}</h2>
      {#each hob.activity as activity, index}
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
    {/if}
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
    margin-left: auto; //aligns div in the center by auto making margins
    margin-right: auto;
    padding-left: 5%;
    margin-bottom: 10%;
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
