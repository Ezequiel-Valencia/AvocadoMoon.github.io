<script lang="ts">
  import { resumeURL } from '../../globals';

  const links = [
    { label: 'Email', text: 'ezq.valencia@gmail.com', href: 'mailto:ezq.valencia@gmail.com' },
    {
      label: 'LinkedIn',
      text: 'Ezequiel Valencia',
      href: 'https://www.linkedin.com/in/ezequielvalencia/',
    },
    { label: 'GitHub', text: 'AvocadoMoon', href: 'https://github.com/AvocadoMoon' },
    { label: 'Resume', text: 'Personal Resume', href: resumeURL },
  ];
</script>

<div id="contact" class="menu-popup" role="dialog" aria-labelledby="contact-title">
  <h2 id="contact-title" class="menu-large-text">Contact Info</h2>

  {#each links as link (link.label)}
    <h3 class="menu-med-text">{link.label}:</h3>
    <a
      class="menu-med-text"
      href={link.href}
      target={link.href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noopener noreferrer">{link.text}</a
    >
  {/each}
</div>

<style lang="scss">
  $button-horizontal-offset: 2%;
  @use 'homeMenu';
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300&display=swap');

  @font-face {
    src: url('/terminal-font.ttf');
    font-family: 'Terminal Font';
  }
</style>
