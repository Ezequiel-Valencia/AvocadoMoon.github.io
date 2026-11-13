<script lang="ts">
  import { hobbies } from './activites';
  import Tabs from '../../common/tabs.svelte';
  import './tabs.scss';

  let activeIndex = $state(0);
  let icons = [
    ['material-symbols-outlined', 'fitness_center'],
    ['material-symbols-outlined', 'brush'],
    ['material-symbols-outlined', 'forest'],
  ];
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
  />
</svelte:head>

<section id="hobbies">
  <h2 id="hob-title">Hobbies</h2>
  <Tabs
    iterable={hobbies}
    bind:activeIndex
    getTabNameFunction={(e) => {
      return e.category;
    }}
    {icons}
  ></Tabs>
  <h3 class="category-name">{hobbies[activeIndex].category}</h3>
  {#each hobbies as hob, index (index)}
    {#if activeIndex == index}
      <div id={hob.category} class="category">
        {#each hob.activity as activity, index (index)}
          <article id={activity.name} class="activity">
            <div class="activity-text">
              <h4>{activity.name}</h4>
              <p id="{activity.name}-description" class="description">
                {activity.description}
              </p>
            </div>
            <img
              src={activity.image}
              alt={activity.name}
              class="activity-image"
              id="{activity.name}-image"
              loading="lazy"
            />
          </article>
        {/each}
      </div>
    {/if}
  {/each}
</section>

<style lang="scss">
  #hobbies {
    height: auto;
    width: 100%;
    position: relative;
    z-index: 2;
    padding-bottom: 5%;
  }

  #hob-title {
    margin: auto;
    text-align: center;
    color: white;
    font-family: 'Times New Roman', Times, serif;
    font-size: xx-large;
    font-style: italic;
    text-decoration: underline;
  }

  .category-name {
    text-align: center;
    color: white;
    font-size: large;
    margin-top: 1rem;
  }

  .category {
    margin: 2rem auto 10%;
    border: 1px solid white;
    max-width: 1000px;
    width: 90%;
  }

  .activity {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 1.5rem;
    color: white;
  }

  .activity + .activity {
    border-top: 1px solid rgba(255, 255, 255, 0.3);
  }

  .activity-text {
    flex: 1;
  }

  h4 {
    font-size: x-large;
    margin: 0 0 0.5rem;
  }

  .description {
    font-size: large;
    line-height: 1.5;
    color: white;
    margin: 0;
  }

  .activity-image {
    width: 150px;
    height: 200px;
    object-fit: cover;
    border-radius: 6px;
    flex-shrink: 0;
  }

  @media (max-width: 600px) {
    .activity {
      flex-direction: column-reverse;
      align-items: center;
      text-align: center;
    }

    .activity-image {
      width: 100%;
      max-width: 300px;
      height: 220px;
    }
  }
</style>
