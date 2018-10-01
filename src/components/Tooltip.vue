<template>
	<div :class="['tooltip', position]" v-if="visible">
    <slot></slot>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import * as interactivity from "store/InteractivityStore";

import Listing from "models/Listing";
import Want from "models/Want";

@Component
export default class Tooltip extends Vue {
  @Prop({ default: false })
  visible!: boolean;

  @Prop({ default: "right" })
  position!: string;
}
</script>

<style scoped>
.tooltip {
  position: absolute;
  left: 100%;
  top: 50%;
  width: max-content;
  max-width: 250px;
  overflow: visible;
  background-color: #fff;
  border: 1px solid #dddbda;
  border-radius: 4px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);
  padding: 4px 8px;
  transform: translate(0, -50%);
  box-sizing: border-box;
  opacity: 0.999;
  z-index: 40;
  pointer-events: none;
}

.tooltip::before,
.tooltip::after {
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  transform: rotate(45deg);
  content: "";
  background-color: inherit;
  top: 50%;
  left: -0.25rem;
  margin-top: -0.25rem;
  z-index: 39;
}

.tooltip::after {
  box-shadow: -1px 1px 2px 0 rgba(0, 0, 0, 0.16);
  z-index: 38;
}

.tooltip b {
  font-family: inherit;
}

.left {
  left: -0.25rem;
  transform: translate(-100%, -50%);
}

.left::before,
.left::after {
  left: calc(100% - 0.25rem);
  transform: rotate(225deg);
}

.bottom {
  top: 100%;
  left: 50%;
  transform: translate(-50%, 0);
}

.bottom::before,
.bottom::after {
  left: 50%;
  margin-left: -0.25rem;
  top: 0;
  transform: rotate(135deg);
}

.top {
  top: -0.25rem;
  left: 50%;
  transform: translate(-50%, -100%);
}

.top::before,
.top::after {
  left: 50%;
  margin-left: -0.25rem;
  top: 100%;
  transform: rotate(315deg);
}
</style>