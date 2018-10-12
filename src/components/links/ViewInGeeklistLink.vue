<template>
	<tooltip-image-link :href="`https://www.boardgamegeek.com/geeklist/item/${want.id}`" image="view-in-geeklist">
		<template slot="tooltip-text">View the GeekList listing for this item</template>
		<template slot="accessibility-text">View the GeekList listing for this item.</template>
	</tooltip-image-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import Want from "models/Want";

import TooltipImageLink from "components/TooltipImageLink.vue";

@Component({
	components: { TooltipImageLink }
})
export default class ViewInGeeklistLink extends Vue {
	@Prop({ required: true })
	want!: Want;
}
</script>

<style scoped>
</style>