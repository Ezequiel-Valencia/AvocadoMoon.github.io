<script lang="ts">
  import { hobbies } from './activites';

  // https://flowbite.com/docs/components/tabs/#typescript

  const tabCSSClass = "inline-block p-5 border-b-2 rounded-t-lg"
  const tabContainerCSSClass = "flex flex-wrap -mb-px text-sm font-medium text-center"
  const listClass = "flex flex-wrap -mb-px text-sm font-medium text-center";

  $: activeIndex = 0;
  
</script>

<div id="hobbies">
  <div id="tabs" class="{tabContainerCSSClass}" style="text-align: center;" role="tablist">
    <ul class="{listClass}" data-tabs-toggle="#stuffs" style="margin: auto; text-align:center; padding:0%;" role="tablist">
      {#each hobbies as hob, index}
        <li class="me-2" style="margin: auto; list-style-type:none;" role="presentation"> 
          <button on:click={
            (e) => {activeIndex = index}
          } 
          class="{tabCSSClass} {activeIndex == index ? "selected_tab" : "tab"}" 
          role="tab" id="{hob.category}">{hob.category}
        </button>
        </li>
      {/each}
    </ul>
  </div>
  <!-- <h1 id="hob-title">Freetime spent</h1> -->
  {#each hobbies as hob, index}
    {#if activeIndex == index}
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

  .tab{
    background-color:cadetblue;
    // border-left: transparent;
    // border-right: transparent;
    // border-top: transparent;
  }

  .tab:hover{
    background-color: #12693b;
  }

  .selected_tab{
    background-color: transparent;
    border-bottom:white;
  }

</style>
