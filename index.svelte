
<script lang="ts">
let movingDiv: any;
let innerDiv: any;
function updatePosition() {
  while(true) {
    const { top, left } = movingDiv.getBoundingClientRect(),
      centerX = left + movingDiv.offsetWidth / 2,
      centerY = top + movingDiv.offsetHeight / 2,
      elPosX = (1 - centerX) / 2,
      elPosY = (1 - centerY) / 2;
    innerDiv.style.transform = `translate3d(${elPosX}px, ${elPosY}px, 0)`;
    requestAnimationFrame(updatePosition);
  }
}
</script>
<style>
.moving-div {
  width: fit-content;
  cursor: pointer;
}
.moving-div > .inner-div {
  position: relative;
  pointer-events: none;
  transform: translate3d(0, 0, 0);
  transition: transform .25s;
}
</style>

<img class="absolute h-screen w-screen" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Simplified_Flag_of_Spain_%28civil_variant%29.svg/2560px-Simplified_Flag_of_Spain_%28civil_variant%29.svg.png" alt="why are you still here?">
<div bind:this={movingDiv} class="moving-div absolute m-64 h-64 w-64 animate-spin">
    <img class="inner-div" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Coat_of_Arms_of_Spain.svg/928px-Coat_of_Arms_of_Spain.svg.png" alt="emblem">
</div>