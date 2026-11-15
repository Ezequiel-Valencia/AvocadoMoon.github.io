<script lang="ts">
  import { zines } from '../zine';
  import DisplayZine from '../displayZine.svelte';
</script>

<div
  style="position: absolute; top: 0; left: 0; text-align:center;
 height:100%; width: 100%;
 "
>
  <DisplayZine zine={zines.emotionless}></DisplayZine>
</div>

<style lang="scss">
</style>
