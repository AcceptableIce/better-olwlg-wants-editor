<template>
	<div class="sweetener">
		<a class="sweetener-name" :href="`https://www.boardgamegeek.com/thing/${sweetener.bgg_id}`">
			{{sweetener.name}}
			<accessibility-text>. View this item on BoardGameGeek.</accessibility-text>
		</a>
		<div class="sweetener-options">
			<price-history-link class="sweetener-option" :want="sweetener"/>
			<sale-history-link :want="sweetener"/>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import Want from "models/Want";

import AccessibilityText from "components/AccessibilityText.vue";
import PriceHistoryLink from "components/links/PriceHistoryLink.vue";
import SaleHistoryLink from "components/links/SaleHistoryLink.vue";

@Component({
	components: { PriceHistoryLink, SaleHistoryLink, AccessibilityText }
})
export default class Sweetener extends Vue {
	@Prop({ required: true })
	sweetener!: Want;
}
</script>

<style scoped>
.sweetener {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
}

.sweetener-name {
  margin-right: 8px;
  text-decoration: none;
  color: #0d17ad;
}

.sweetener-options {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  padding-left: 20px;
  height: 100%;
}
.sweetener-option {
  margin-right: 8px;
}
</style>