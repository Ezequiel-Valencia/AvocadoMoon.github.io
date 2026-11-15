<script lang="ts">
  import type { zineMetaData } from './zine';
  interface Props {
    zine: zineMetaData;
  }

  let { zine }: Props = $props();
</script>

<svelte:head>
  <title>{zine.title} | Ezequiel Valencia</title>
</svelte:head>

<div class="zine-page" style="background-image: url('{zine.backgroundImage}');">
  <div class="zine-header">
    <a class="zine-link" href="/zines">&larr; All Zines</a>
    <h1 class="zine-title">{zine.title}</h1>
    <a class="zine-link" href={zine.pdfPath} target="_blank" rel="noopener">Open PDF &nearr;</a>
  </div>

  <object class="pdf-object" type="application/pdf" data={zine.pdfPath} aria-label={zine.title}>
    <!-- Shown when the browser can't display PDFs inline (most phones) -->
    <div class="pdf-fallback">
      <img src={zine.zineCover} alt="Cover of {zine.title}" />
      <p>Your browser can't show the zine here.</p>
      <a class="zine-link" href={zine.pdfPath} target="_blank" rel="noopener">Read the PDF</a>
    </div>
  </object>
</div>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500&display=swap');

  .zine-page {
    min-height: 100vh;
    padding: 9vh 1rem 4vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-color: #111;
  }

  .zine-header {
    width: 80vw;
    max-width: 1100px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.6rem 1.2rem;
    border-radius: 12px;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .zine-title {
    margin: 0;
    color: white;
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: clamp(1.1rem, 2.5vw, 1.6rem);
    text-align: center;
  }

  .zine-link {
    color: goldenrod;
    white-space: nowrap;
    text-decoration: none;
  }

  .zine-link:hover,
  .zine-link:focus-visible {
    text-decoration: underline;
  }

  .pdf-object {
    width: 80vw;
    max-width: 1100px;
    height: 85vh;
    border-radius: 6px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  }

  .pdf-fallback {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem 1rem;
    border-radius: 12px;
    color: white;
    background-color: rgba(0, 0, 0, 0.8);

    img {
      max-width: 240px;
      width: 70%;
      border-radius: 4px;
    }

    p {
      margin: 0;
    }
  }

  @media screen and (max-width: 768px) {
    .zine-header {
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
    }
    .zine-title {
      order: -1;
      width: 100%;
    }
    .pdf-object {
      width: 100%;
      height: auto;
      min-height: 70vh;
    }
  }
</style>
