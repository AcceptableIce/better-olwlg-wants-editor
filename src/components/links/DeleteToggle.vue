<template>
	<tooltip-image-link @press="toggleDelete($event)" :image="deleteImage">
		<template slot="tooltip-text">{{deleteMessage}}</template>
		<template slot="accessibility-text">{{deleteMessage}}.</template>
	</tooltip-image-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import * as wantsStore from "store/WantsStore";

import TooltipImageLink from "components/TooltipImageLink.vue";
import { WantOrDummy } from "models/Dummy";

@Component({
	components: { TooltipImageLink }
})
export default class DeleteToggle extends Vue {
	@Prop({ required: true })
	want!: WantOrDummy;

	toggleDelete() {
		if(this.want.toDelete) {
			wantsStore.restoreItem(this.$store, this.want);
		} else {
			wantsStore.deleteItem(this.$store, this.want);
		}
	}

	get deleteMessage(): string {
		if(this.want.toDelete) {
			return "Undo delete";
		} else {
			return "Delete item";
		}
	}

	get deleteImage(): string {
		if(this.want.toDelete) {
			return "undo";
		} else {
			return "delete";
		}
	}
}
</script>

<style scoped>
</style>