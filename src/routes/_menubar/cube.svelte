<script lang="ts">
    export let cubeImage: string
</script>



<section>
    <div class="cube">
        <div class="bottom face"></div>
        <div class="left face"></div>
        <div class="right face"></div>
        <img class="front face" src={cubeImage} alt="cube">
        <div class="back face"></div>
        <div class="top face"></div>
    </div>
</section>



<style lang="scss">
 :root{
  --face-space:5vmin;
  --face-color: skyblue;
 }
    @keyframes turn {
  from { transform: rotate3d(0, 0, 0, 0); }
  to { transform: rotate3d(1, 1, 0, 360deg); }
}

  @keyframes returnTo{
    to {transform: rotate3d(0, 0, 0, 0);}
  }

section {
  width: 10vw;
  height: 10vh;
  perspective: 500px;
  // margin: 100px;
}
.cube {
  position: relative;
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  animation: turn 5s linear infinite;
}
.cube:hover{
  transition: all 1s;
  animation: returnTo 1s linear;
  --face-space: 6vmin;
  --face-color: rgb(33, 185, 255);
}

.face {
  width: 10vmin;
  height: 10vmin;
  background: var(--face-color);
  border: 2px solid black;
  position: absolute;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
  font-size: 2rem;
  transition: transform 500ms;
}

.front {
  transform: translateZ(var(--face-space));
}

.back {
  transform: translateZ(calc( -1 * var(--face-space))) rotateY(180deg);
}

.left {
  transform: translateX(calc( -1 * var(--face-space))) rotateY(-90deg);
}

.right {
  transform: translateX(var(--face-space)) rotateY(90deg);
}

.top {
  transform: translateY(calc( -1 * var(--face-space))) rotateX(90deg);
}

.bottom {
  transform: translateY(var(--face-space)) rotateX(-90deg);
}

@media (prefers-reduced-motion: reduce) {
  .cube {
    animation: none;
    transform: rotate3d(1, 1, 0, 45deg);
  }
}
</style>

