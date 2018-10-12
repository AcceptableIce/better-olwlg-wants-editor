<template>
	<tooltip-image-link :href="`prices.cgi?gameid=${want.bgg_id}`" image="price-history-table">
		<template slot="tooltip-text">View the BoardGameGeek sale history of this item</template>
		<template slot="accessibility-text">View the BoardGameGeek sale history of this item.</template>
	</tooltip-image-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import Want from "models/Want";

import TooltipImageLink from "components/TooltipImageLink.vue";

@Component({
	components: { TooltipImageLink }
})
export default class SaleHistoryLink extends Vue {
	@Prop({ required: true })
	want!: Want;
}
</script>

<style scoped>
</style>