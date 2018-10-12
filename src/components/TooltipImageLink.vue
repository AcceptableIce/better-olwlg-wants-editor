<template>
	<button v-if="isButton" class="tooltip-image-link link-button" :style="styleData" @click="$emit('press', $event)" @mouseover="toggleTooltip(true)" @mouseout="toggleTooltip(false)">
		<tooltip-image-link-content :showTooltip="showTooltip">
			<slot name="tooltip-text" slot="tooltip-text"/>
			<slot name="accessibility-text" slot="accessibility-text"/>
		</tooltip-image-link-content>
	</button>
	
	<a v-else class="tooltip-image-link" :style="styleData" :href="href" :target="href ? '_blank' : ''" @mouseover="toggleTooltip(true)" @mouseout="toggleTooltip(false)">
		<tooltip-image-link-content :showTooltip="showTooltip">
			<slot name="tooltip-text" slot="tooltip-text"/>
			<slot name="accessibility-text" slot="accessibility-text"/>
		</tooltip-image-link-content>
	</a>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

import TooltipImageLinkContent from "components/TooltipImageLinkContent.vue";

// Force webpack to bundle all the icons.
const imageContext = require.context("assets", true, /\.png$/);

@Component({
	components: { TooltipImageLinkContent }
})
export default class TooltipImageLink extends Vue {
	@Prop({ required: true })
	image!: string;

	@Prop()
	href!: string;


	@Prop({ default: false })
	disableTooltip: boolean = false;

	showTooltip: boolean = false;

	get isButton() {
		return this.href === undefined;
	}

	get styleData() {
		return {
			backgroundImage: `url(${imageContext(`./${this.image}.png`)})`
		};
	}

	@Watch("disableTooltip")
	onDisableTooltipChange(newValue: boolean) {
		if(newValue) this.showTooltip = false;
	}

	toggleTooltip(state: boolean) {
		if(!this.disableTooltip) {
			this.showTooltip = state;
		}
	}
}
</script>

<style scoped>
.tooltip-image-link {
  position: relative;
  width: 24px;
  height: 24px;
  background-size: cover;
}

.link-button {
  border: none;
  background-color: transparent;
  font-size: 1rem;
  color: #333;
  font-family: inherit;
}

.tooltip-image-link:focus {
  outline: none;
}

.tooltip-image-link:focus::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #0d17ad;
  box-sizing: border-box;
}
</style>