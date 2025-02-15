<script lang="ts">
    let nParticles = []
    for(let i = 0; i < 200; i++){
        nParticles.push(i)
    }
</script>

<section class="container">
    {#each nParticles as i}
    <div class="circle-container">
        <div class="circle"></div>
    </div>
    
{/each}
</section>







<style lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: -50;
}



.circle-container {
  $particleNum: 200;
  $particleColor: hsl(212, 100%, 67%);

  position: absolute;
  transform: translateY(-10vh);
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  .circle {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    mix-blend-mode: screen;
    background-image: radial-gradient(
      hsla(180, 100%, 64%, 0.671),
      hsla(180, 100%, 74%, 0.534) 10%,
      hsla(180, 100%, 80%, 0) 56%
    );

    animation: fadein-frames 200ms infinite, scale-frames 2s infinite;

    @keyframes fade-frames {
      0% {
        opacity: 1;
      }

      50% {
        opacity: 0.7;
      }

      100% {
        opacity: 1;
      }
    }

    @keyframes scale-frames {
      0% {
        transform: scale3d(0.4, 0.4, 1);
      }

      50% {
        transform: scale3d(2.2, 2.2, 1);
      }

      100% {
        transform: scale3d(0.4, 0.4, 1);
      }
    }
  }

  $particleBaseSize: 20;

  
  @for $i from 1 through $particleNum {
    &:nth-child(#{$i}) {
      $circleSize: random($particleBaseSize);
      width: $circleSize + px;
      height: $circleSize + px;

      $startPositionY: random(10) + 100;
      $framesName: "move-frames-" + $i;
      $moveDuration: 48000 + random(9000) + ms;

      animation-name: #{$framesName};
      animation-duration: $moveDuration;
      animation-delay: random(37000) + ms;

      @keyframes #{$framesName} {
        from {
          transform: translate3d(
            #{random(100) + vw},
            #{$startPositionY + vh},
            0
          );
        }

        to {
          transform: translate3d(
            #{random(100) + vw},
            #{- $startPositionY - 50 - random(50) + vh},
            0
          );
        }
      }

      .circle {
        animation-delay: random(4000) + ms;
      }
    }
  }
}

</style>


