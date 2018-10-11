<template>
	<div :class="['wants-grid-cell', 'item-data', isDummy ? 'dummy' : '', want.toDelete ? 'deleting' : '']">
		<div class="item-metadata">
			<a class="item-name" :href="`https://www.boardgamegeek.com/thing/${want.bgg_id}`">
				{{want.name}}
				<accessibility-text>{{want.name}}. Listed by {{want.owner}}. Click to view this item on BoardGameGeek</accessibility-text>
			</a>
			<div class="item-owner">{{want.owner}}</div>
    </div>
    <div class="item-options">
      <price-history-link v-if="!isDummy" class="item-option" :want="want"/>
      <sale-history-link v-if="!isDummy" class="item-option" :want="want"/>
      <div v-if="isDummy" class="dummy-spacer"></div>

      <toggleable-editor-image-link v-if="!isDummy && want.sweeteners.length > 0" class="sweeteners-editor" image="sweeteners" closeLabel="Close">
        <template slot="tooltip-text">View sweeteners</template>
        <template slot="accessibility-text">View sweeteners</template>
        <template slot="editor-content">
          <sweetener v-for="(sweetener, index) in want.sweeteners" :key="index" :sweetener="sweetener"/>
        </template>
      </toggleable-editor-image-link>
      <div v-else class="no-sweeteners-spacer"></div>
      <delete-toggle class="item-option" :want="want"/>
    </div>
    <div class="value-editor">
      <label class="value-label" :for="`value-input-${want.id}`">Value</label>
      <input type="number" class="value-input" :id="`value-input-${want.id}`" :value="want.value" @input="updateValue($event)"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import * as wantsStore from "store/WantsStore";

import Dummy from "models/Dummy";
import Want from "models/Want";

import ToggleableEditorImageLink from "components/ToggleableEditorImageLink.vue";
import TooltipImageLink from "components/TooltipImageLink.vue";
import AccessibilityText from "components/AccessibilityText.vue";
import DeleteToggle from "components/links/DeleteToggle.vue";
import PriceHistoryLink from "components/links/PriceHistoryLink.vue";
import SaleHistoryLink from "components/links/SaleHistoryLink.vue";
import Sweetener from "components/Sweetener.vue";


@Component({
  components: { ToggleableEditorImageLink, TooltipImageLink, AccessibilityText, PriceHistoryLink, SaleHistoryLink, Sweetener, DeleteToggle }
})
export default class WantsGridItemDataCell extends Vue {
  @Prop({ required: true })
  want!: Want | Dummy;

  get isDummy(): boolean {
    return this.want instanceof Dummy;
  }

  updateValue(event: Event) {
    wantsStore.updateValue(this.$store, {
      want: this.want,
      value: Number((<HTMLInputElement>event.target).value)
    });
  }
}
</script>

<style scoped>
.item-data {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.wants-grid-cell.dummy {
  background-color: #cbffdb;
}

.item-metadata {
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  align-self: stretch;
  min-width: 0;
}

.item-name {
  margin-bottom: 0px;
  text-decoration: none;
  color: #0d17ad;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

.item-owner {
  font-size: 0.8rem;
}

.item-options {
  position: relative;
  display: flex;
  flex-shrink: 1;
  min-width: 50px;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  padding-left: 20px;
  height: 100%;
}

.item-options::before {
  content: "";
  position: absolute;
  width: 1px;
  height: 80%;
  top: 10%;
  left: 10px;
  background-color: #ccc;
}

.item-option {
  margin-right: 8px;
}

.value-editor {
  position: relative;
  display: flex;
  flex-direction: column;
  left: 2px;
  top: 2px;
  width: 40px;
  height: 40px;
  align-self: flex-end;
}

.value-input {
  width: 100%;
  height: 100%;
  font-size: 0.85rem;
  padding: 4px 8px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-right: none;
  border-bottom: none;
  border-radius: 0;
  box-sizing: border-box;
  line-height: 0;
  text-align: center;
}

.value-input::-webkit-inner-spin-button,
.value-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.value-label {
  left: 0;
  width: calc(100% - 1px);
  background-color: #eee;
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
  text-align: center;
  font-size: 0.7rem;
  color: #333;
  z-index: 1;
}

.no-sweeteners-spacer {
  display: block;
  width: 24px;
  height: 24px;
}

.dummy-spacer {
  display: block;
  width: 64px;
  height: 24px;
}

.deleting::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  pointer-events: none;
  z-index: 2;
}
</style>