<script lang="ts">
    import { onMount } from "svelte";
    
    export const dreamThoughts = [
  "Server side image processing for microscopist's",
  'Bot that sends digits of pi',
  'A shaming computer trash bin',
  'mTLS with post-quantum encryption schemes',
  'Geo-guesser website for home items',
  'Soundboard for smells',
  'Solution for NP=P',
  'Dr. Phil Message Sender',
  'Breathalyzer for water (stay hydrated)',
]
    
    let fishHoverIndex = -1;
    let numFishes = 5;
    let startDreamThoughtsIndex = Math.floor(Math.random() * (dreamThoughts.length - numFishes - 1))

    
  
    onMount(() => {
      const fishes = document.querySelectorAll(".fish-slide") as NodeListOf<HTMLElement>;
  
      fishes.forEach((fish, i) => {
        fish.addEventListener("pointerenter", (e) => {
          fishHoverIndex = i
        })
        fish.addEventListener("pointerleave", (e) => {
          fishHoverIndex = -1
        })
      })
    
    })
  </script>
  
  
<div>
    {#each {length: numFishes} as _, i}
    <figure class="fish-slide" style="--l-val: -{ (i * (Math.random() * 20)) + (i * 2)}%; 
    left: var(--l-val); position:absolute; top: {i * 18}%;">
      <img draggable="false" class="fish"
        src={i % 2 == 0 ? "./personal_projects/fish.svg": "./personal_projects/fish-2.svg"} 
        alt="fish" style="transform: {i % 2 == 0 ? "scale(-1, 1)": ""};">
        {#if fishHoverIndex == i}
          <figcaption class="fish-caption" style="opacity: 1; color:white;">
            Fish Idea: <br>
            {dreamThoughts[startDreamThoughtsIndex + i]}
          </figcaption>
        {/if}
    </figure>
    {/each}
</div>

  
  
  <style lang="scss">
  
    .fish{
      color: white;
      height: 5vmin;
      animation: fishStrobe 5s ease alternate-reverse infinite;
    }
  
    .fish-slide{
      animation: swim-right 40s linear infinite;
    }
  
    .fish-slide:hover{
      animation-play-state: paused;
    }
  
    .fish:hover{
      filter: invert(1);
      animation: shake 0.7s infinite, swim-right 40s linear infinite;
      cursor: grab;
    }

    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(5deg); }
        10% { transform: translate(-1px, -5px) rotate(-1deg); }
        20% { transform: translate(-3px, 10px) rotate(3deg); }
        30% { transform: translate(13px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -8px) rotate(5deg); }
        50% { transform: translate(-8px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(10deg); }
        70% { transform: translate(3px, 10px) rotate(-1deg); }
        80% { transform: translate(-11px, -1px) rotate(10deg); }
        90% { transform: translate(1px, 11px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
    }

    @keyframes swim-right{
        from {
            left: var(--l-val)
        }
        to {
            left: 110vw;
        }
    }

    @keyframes fishStrobe{
        0% {
            filter: invert(0);
        } 50% {
            filter: invert(0);
        } 100% {
            filter: invert(0.5);
        }
    }
  
  </style>
  