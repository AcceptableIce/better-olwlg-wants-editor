<template>
	<span class="accessibility-text">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class AccessibilityText extends Vue { }
</script>

<style scoped>
.accessibility-text {
  position: absolute;
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  z-index: -1000;
  font-size: 1px;
}
</style>