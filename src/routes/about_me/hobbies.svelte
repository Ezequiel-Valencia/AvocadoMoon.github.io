<script lang="ts">
  import { Tabs } from 'flowbite';
  import { hobbies } from './activites.ts';
</script>

<div id="hobbies">
  <!-- <h1 id="hob-title">Freetime spent</h1> -->
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
