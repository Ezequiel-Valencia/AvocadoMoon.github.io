<script lang="ts">
  import { zines } from './zine';
  const zineList = Object.values(zines);
</script>

<ul id="zines">
  {#each zineList as zine (zine.name)}
    <li>
      <a class="zine-card" href={zine.redirect}>
        <div class="cover-frame">
          <img class="zine-cover" src={zine.zineCover} alt="Cover of {zine.title}" loading="lazy" />
          <p class="description">{zine.description}</p>
        </div>
        <h2 class="title">{zine.title}</h2>
        <p class="date-made">Made {zine.dateMade}</p>
        <p class="touch-description">{zine.description}</p>
      </a>
    </li>
  {/each}
</ul>

<style lang="scss">
  #zines {
    list-style: none;
    background-color: rgba(0, 0, 0, 0.7);
    width: 90vw;
    max-width: 1250px;
    margin: 0 auto 8vh;
    padding: 2.5rem 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2.5rem 2rem;
    border-style: solid;
    border-image-source: url('/zines/star-line.png');
    border-image-repeat: round;
    border-image-slice: 33%; // what percent of the image from left, right, top, and bottom sides should the slicing line drop to
    border-image-width: 25px; //size of the border
    border-image-outset: 20px; //how far out from the height/width of the element
  }

  .zine-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    height: 100%;
    padding: 1rem;
    border-radius: 8px;
    text-decoration: none;
    transition:
      background-color 0.4s,
      transform 0.4s;
  }

  .zine-card:hover,
  .zine-card:focus-visible {
    background-color: rgba(0, 0, 0, 0.85);
    transform: translateY(-4px);
  }

  .zine-card:focus-visible {
    outline: 2px solid goldenrod;
    outline-offset: 4px;
  }

  // The description fades in over the cover, so the cover is never replaced
  .cover-frame {
    position: relative;
    width: 100%;
    max-width: 300px;
    aspect-ratio: 3 / 4;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
  }

  .zine-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s;
  }

  .description {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 1rem;
    color: white;
    font-size: 0.95rem;
    line-height: 1.4;
    background-color: rgba(0, 0, 0, 0.93);
    opacity: 0;
    transition: opacity 0.4s;
  }

  .zine-card:hover .description,
  .zine-card:focus-visible .description {
    opacity: 1;
  }

  .zine-card:hover .zine-cover,
  .zine-card:focus-visible .zine-cover {
    transform: scale(1.05);
  }

  .title {
    margin: 0;
    color: goldenrod;
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 1.15rem;
    text-align: center;
  }

  .date-made {
    margin: -0.5rem 0 0;
    color: goldenrod;
    font-size: 0.8rem;
    letter-spacing: 0.03em;
    opacity: 0.85;
  }

  .touch-description {
    display: none;
    margin: 0;
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.9rem;
    line-height: 1.4;
    text-align: center;
  }

  // Touch screens can't hover, so show the description under the title instead
  @media (hover: none) {
    .cover-frame {
      max-width: 260px;
    }
    .description {
      display: none;
    }
    .touch-description {
      display: block;
    }
  }

  @media screen and (max-width: 768px) {
    #zines {
      width: 85vw;
      padding: 2rem 1rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .zine-card,
    .zine-cover,
    .description {
      transition: none;
    }
    .zine-card:hover,
    .zine-card:focus-visible {
      transform: none;
    }
  }
</style>
