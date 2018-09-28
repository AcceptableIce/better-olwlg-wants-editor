<template>
	<tooltip-image-link :href="`https://www.spielboy.com/GeekPrices.php?gameID=${want.bgg_id}`" image="price-history-graph">
		<template slot="tooltip-text">View the price history of this item.</template>
		<template slot="accessibility-text">View the price history of this item.</template>
	</tooltip-image-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import Want from "models/Want";

import TooltipImageLink from "components/TooltipImageLink.vue";

@Component({
	components: { TooltipImageLink }
})
export default class PriceHistoryLink extends Vue {
	@Prop({ required: true })
	want!: Want;
}
</script>

<style scoped>
</style>