<script lang="ts">
  import { onMount } from "svelte";
  export let text = "Scroll Down"
    $: scrolledDown = false
    onMount(() => {
        window.addEventListener("scroll", function() {
            scrolledDown = window.scrollY > 50;
        });
    })
    
</script>


<div class="scroll-down {scrolledDown ? 'hidden': ''}" id="scrollDown">
    {text}
    <span class="arrow">&#x2193;</span>
</div>


<style lang="scss">
    .scroll-down {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        font-size: large;
        color: white;
        font-weight: bold;
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
    }
    
    .arrow {
        font-size: 40px;
        display: block;
        animation: bounce 1.5s infinite;
    }
    
    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(10px);
        }
    }
    
    .hidden {
        opacity: 0;
        pointer-events: none;
    }
</style>

