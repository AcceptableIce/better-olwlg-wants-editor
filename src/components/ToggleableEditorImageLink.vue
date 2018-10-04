<template>
	<div class="toggleable-editor-image-link">
		<tooltip-image-link @press="toggleEditor($event)" :image="image" :disableTooltip="showEditor">
			<slot name="tooltip-text" slot="tooltip-text"/>
			<slot name="accessibility-text" slot="accessibility-text"/>
		</tooltip-image-link>
	
		<tooltip class="toggleable-editor" :visible="showEditor" position="bottom" :style="editorStyle" v-on-clickaway="closeEditor">
			<div class="editor-content">
				<slot name="editor-content"/>
				<button class="close-button" @click="closeEditor">{{closeLabel}}</button> 
			</div>
		</tooltip>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { mixin as clickaway } from "vue-clickaway";

import TooltipImageLink from "components/TooltipImageLink.vue";
import Tooltip from "components/Tooltip.vue";

@Component({
	components: { TooltipImageLink, Tooltip },
	mixins: [clickaway]
})
export default class ToggleableEditorImageLink extends Vue {
	@Prop({ required: true })
	image!: string;

	@Prop({ default: "Close" })
	closeLabel!: string;

	showEditor: boolean = false;

	editorOffsetX: number = 0;

	get editorStyle() {
		return {
			marginLeft: `${this.editorOffsetX}px`
		};
	}

	toggleEditor(event: MouseEvent) {
		if(event.target) {
			this.showEditor = !this.showEditor;

			const element = (<HTMLElement>event.target);

			this.editorOffsetX = element.offsetLeft + element.offsetWidth / 2;

			if(this.showEditor) {
				this.$nextTick(() => {
					const firstInput = <HTMLInputElement>this.$el.querySelector(".toggleable-editor input, .toggleable-editor button");

					if(firstInput) firstInput.focus();
				});
			} else {
				this.focusLink();
			}
		}
	}

	closeEditor(value: number) {
		this.showEditor = false;
		this.focusLink();
	}

	focusLink() {
		(<HTMLInputElement>this.$el.querySelector(".tooltip-image-link")).focus();
	}
}
</script>

<style scoped>
.toggleable-editor {
  left: 0;
}

.tooltip-content {
  color: #333;
}

.tooltip {
  padding: 8px;
  pointer-events: all;
}

.editor-content {
  display: flex;
  flex-direction: column;
}

.close-button {
  display: block;
  margin: 12px 8px 12px 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  padding: 8px 16px;
  transition: background-color 0.25s;
  margin: 12px 0 0 auto;
}

.close-button:hover,
.close-button:focus {
  background-color: #f0f0f0;
}
</style>