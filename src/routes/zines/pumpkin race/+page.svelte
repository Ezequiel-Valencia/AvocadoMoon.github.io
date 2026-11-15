<script lang="ts">
  import { zines, type zineMetaData } from '../zine';
  import DisplayZine from '../displayZine.svelte';
  let zine: zineMetaData = zines.pumpkinRace;
</script>

<div
  style="position: absolute; top: 0; left: 0; text-align:center;
 height:100%; width: 100%;
 "
>
  <DisplayZine {zine}></DisplayZine>
</div>
