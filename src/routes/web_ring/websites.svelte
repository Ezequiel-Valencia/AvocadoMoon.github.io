<script lang="ts">
  import Tabs from '../../common/tabs.svelte';
  import { webRing, type WebRingCategory } from './WebsInrRing';
  import './tabs.scss';

  let activeIndex = $state(0);
  const icons = webRing.map((category) => ['material-symbols-outlined', category.icon]);
  const activeCategory = $derived(webRing[activeIndex]);

  function hostname(url: string): string {
    return new URL(url).hostname.replace(/^www\./, '');
  }
</script>

<article class="web-ring">
  <Tabs
    iterable={webRing}
    bind:activeIndex
    getTabNameFunction={(category: WebRingCategory) => category.name}
    {icons}
  ></Tabs>

  <div class="panel" role="tabpanel" aria-labelledby={activeCategory.name}>
    <h3 class="category-title">{activeCategory.name}</h3>

    <ul class="site-list">
      {#each activeCategory.sites as web (web.url)}
        <li>
          <a class="site-card" href={web.url} target="_blank" rel="noopener noreferrer">
            <img class="web-image" src={web.imgLocation} alt="" loading="lazy" />
            <div class="site-text">
              <h4 class="site-title">{web.webTitle}</h4>
              <span class="site-host">{hostname(web.url)} ↗</span>
              <p class="site-description">{web.description}</p>
              <p class="site-opinion"><strong>Thoughts:</strong> {web.opinion}</p>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</article>

<style lang="scss">
  .web-ring {
    text-align: center;
    padding: 0 16px 5vh;
    color: white;
  }

  .category-title {
    width: min(35vw, 400px);
    min-width: 200px;
    margin: 3vh auto 4vh;
    padding-bottom: 0.25em;
    border-bottom: 2px solid white;
    font-size: clamp(1.25rem, 4vmin, 2rem);
  }

  .site-list {
    list-style: none;
    margin: 0 auto;
    padding: 0;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .site-card {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem 1.5rem;
    background-color: rgba(0, 0, 0, 0.8);
    border: 4px double indigo;
    color: white;
    text-align: left;
    text-decoration: none;
    transition:
      border-color 0.2s,
      transform 0.2s,
      box-shadow 0.2s;

    &:hover,
    &:focus-visible {
      border-color: goldenrod;
      transform: translateY(-3px);
      box-shadow: 0 0 16px rgba(218, 165, 32, 0.45);
    }

    &:focus-visible {
      outline: 2px solid white;
      outline-offset: 3px;
    }
  }

  .web-image {
    flex-shrink: 0;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: 3px ridge white;
  }

  .site-text {
    min-width: 0;
  }

  .site-title {
    margin: 0;
    font-size: clamp(1.15rem, 3.5vmin, 1.75rem);
    font-weight: bold;
  }

  .site-host {
    display: inline-block;
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
    color: #b9a4ff;
    word-break: break-all;
  }

  .site-description {
    margin: 0 0 0.5rem;
    font-size: clamp(0.95rem, 2.7vmin, 1.2rem);
  }

  .site-opinion {
    margin: 0;
    font-size: clamp(0.9rem, 2.5vmin, 1.1rem);
    color: #ddd;
  }

  @media (max-width: 600px) {
    .site-card {
      flex-direction: column;
      text-align: center;
      gap: 0.75rem;
    }

    .web-image {
      width: 120px;
      height: 120px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .site-card {
      transition: none;

      &:hover,
      &:focus-visible {
        transform: none;
      }
    }
  }
</style>
