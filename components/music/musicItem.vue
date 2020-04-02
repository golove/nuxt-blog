<template>
  <span
    :style="{background: bgColor,width:size+'px',height:size+'px',borderRadius:'50%',padding:'4px'}"
    class="boxst"
  >
    <svg
      :style="{ width: size+'px',height: size+'px',fill: color}"
      @click.stop="$emit('clickfunc')"
      class="toolicon"
    >
      <slot name="icon" />
    </svg>
  </span>
</template>

<script>
export default {
  name: "musicitem",
  props: { size: null, color: null, bgColor: null },
  data() {
    return {};
  }
};
</script>


<style>
.boxst {
  cursor: pointer;
}
</style>