<template>
	<div>
		<tooltip class="tooltip-content" :visible="showTooltip" position="bottom">
			<slot name="tooltip-text"></slot>
		</tooltip>
		<accessibility-text>
			<slot name="accessibility-text"></slot>
		</accessibility-text>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import Tooltip from "components/Tooltip.vue";
import AccessibilityText from "components/AccessibilityText.vue";

@Component({
	components: { Tooltip, AccessibilityText }
})
export default class TooltipImageLink extends Vue {
	@Prop({ required: true })
	showTooltip: boolean = false;
}
</script>

<style scoped>
.tooltip-content {
  color: #333;
  text-align: center;
  max-width: 225px; /* Avoid edge of screen cutoff */
}
</style>