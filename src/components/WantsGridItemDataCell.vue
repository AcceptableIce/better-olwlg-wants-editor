<template>
	<div :class="['wants-grid-cell', 'item-data', isDummy ? 'dummy' : '']">
		<div class="item-metadata">
			<a class="item-name" :href="`https://www.boardgamegeek.com/thing/${want.bgg_id}`">
				{{want.name}}
				<accessibility-text>. View this item on BoardGameGeek.</accessibility-text>
			</a>
			<div class="item-owner">{{want.owner}}</div>
    </div>
    <div class="item-options">
      <price-history-link v-if="!isDummy" class="item-option" :want="want"/>
      <sale-history-link v-if="!isDummy" class="item-option" :want="want"/>
      <div v-if="isDummy" class="dummy-spacer"></div>

      <toggleable-editor-image-link class="item-option" image="edit-value" closeLabel="Save">
        <template slot="tooltip-text">Assign a value to this item.</template>
        <template slot="accessibility-text">Assign a value to this item.</template>
        <template slot="editor-content">
    			<label class="value-label" for="value-input">Value</label>
			    <input type="number" class="value-input" id="value-input" :value="value"/>
        </template>
      </toggleable-editor-image-link>

      <toggleable-editor-image-link v-if="!isDummy && want.sweeteners.length > 0" class="sweeteners-editor" image="sweeteners" closeLabel="Close">
        <template slot="tooltip-text">View sweeteners.</template>
        <template slot="accessibility-text">View sweeteners.</template>
        <template slot="editor-content">
          <sweetener v-for="sweetener in want.sweeteners" :key="sweetener.id" :sweetener="sweetener"/>
        </template>
      </toggleable-editor-image-link>
      <div v-else class="no-sweeteners-spacer"></div>
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
import PriceHistoryLink from "components/links/PriceHistoryLink.vue";
import SaleHistoryLink from "components/links/SaleHistoryLink.vue";
import Sweetener from "components/Sweetener.vue";

@Component({
  components: { ToggleableEditorImageLink, TooltipImageLink, AccessibilityText, PriceHistoryLink, SaleHistoryLink, Sweetener }
})
export default class WantsGridItemDataCell extends Vue {
  @Prop({ required: true })
  want!: Want | Dummy;

  value: number = 0;

  get isDummy(): boolean {
    return this.want instanceof Dummy;
  }
}
</script>

<style scoped>
.item-data {
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
}

.item-name {
  margin-bottom: 0px;
  text-decoration: none;
  color: #0d17ad;
}

.item-owner {
  font-size: 0.8rem;
}

.item-options {
  position: relative;
  display: flex;
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

.value-input {
  font-size: 1rem;
  padding: 4px 8px;
  width: 100px;
  height: 34px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
  font-size: 0.8rem;
  color: #333;
  margin-bottom: 4px;
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
</style>