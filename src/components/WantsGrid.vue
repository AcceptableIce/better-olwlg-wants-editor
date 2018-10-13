<template>
  <div class="wants-grid-container">
    <div class="wants-grid" :style="{ gridTemplateColumns: `min-content repeat(${listings.length}, 40px)` }">
      <div class="wants-grid-cell header-spacer"></div>
      
      <wants-grid-header-cell v-for="(listing, index) in listings" :listing="listing" :index="index" :key="`listing-${listing.id}`"/>

      <template v-for="(want, y) in wantsAndDummies">
        <wants-grid-item-data-cell :want="want" :key="'item-data-' + want.id"/>

        <template v-for="(listing, x) in listings">
          <wants-grid-toggle-cell
            :class="calculateCellClasses(x, y)"
            :x="x"
            :y="y"
            :want="want" 
            :listing="listing"
            :pendingUpdateStatus="cellPendingUpdateStatuses[x][y]"
            :key="`cell-${listing.id}-${want.id}`"/> 
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as wantsStore from "store/WantsStore";
import * as interactivity from "store/InteractivityStore";

import Want from "models/Want";
import Listing from "models/Listing";
import Dummy, { WantOrDummy } from "models/Dummy";

import WantsGridHeaderCell from "components/WantsGridHeaderCell.vue";
import WantsGridToggleCell, { PendingStatus } from "components/WantsGridToggleCell.vue";
import WantsGridItemDataCell from "components/WantsGridItemDataCell.vue";

@Component({
  components: { WantsGridHeaderCell, WantsGridToggleCell, WantsGridItemDataCell }
})
export default class WantsGrid extends Vue {
  _cellPendingUpdateStatuses?: PendingStatus[][] = undefined;

  get wants(): Want[] {
    return wantsStore.getWants(this.$store);
  }

  get listings(): Listing[] {
    return wantsStore.getListings(this.$store);
  }

  get wantsAndDummies(): WantOrDummy[] {
    return wantsStore.utilities.concatAndSortWantsAndDummies(this.wants, this.listings);
  }

  get cellPendingUpdateStatuses(): PendingStatus[][] {
    const massEditStatus = interactivity.getMassEditStatus(this.$store);

    if(!this._cellPendingUpdateStatuses) {
      this._cellPendingUpdateStatuses = [];

      for(let y = 0; y < this.listings.length; y += 1) {
        const row = [];

        for(let x = 0; x < this.wantsAndDummies.length; x += 1) {
          row.push(undefined);
        }

        this._cellPendingUpdateStatuses.push(row);
      }
    }

    let editType: PendingStatus = undefined;

    if(massEditStatus.isEditing) {
      editType = massEditStatus.enableAfterRelease ? "enabled" : "disabled";
    }

    if(this._cellPendingUpdateStatuses[0]) {
      for(let x = 0; x < this._cellPendingUpdateStatuses.length; x++) {
        for(let y = 0; y < this._cellPendingUpdateStatuses[0].length; y++) {
          const withinX = massEditStatus.boundries && x >= massEditStatus.boundries.min.x && x <= massEditStatus.boundries.max.x;
          const withinY = massEditStatus.boundries && y >= massEditStatus.boundries.min.y && y <= massEditStatus.boundries.max.y;
          const newValue = withinX && withinY ? editType : undefined;

          if(newValue !== this._cellPendingUpdateStatuses[x][y]) {
            this._cellPendingUpdateStatuses[x][y] = newValue;
          }
        }
      }
    }

    return this._cellPendingUpdateStatuses;
  }

  created() {
    window.addEventListener("mouseup", evt => {
      evt.stopPropagation();

      wantsStore.updateWantStatusByMassEdit(this.$store, interactivity.getMassEditStatus(this.$store));

      interactivity.stopMassEdit(this.$store);
    }, true);
  }

  calculateCellClasses(x: number, y: number): object {
    const classList: any = {};

    if(y === 0) classList["first-row"] = true;

    classList["column-offset-" + x % 4] = true;

    return classList;
  }
}
</script>

<style scoped>
.wants-grid-container {
  position: relative;
  margin-top: 72px;
  clip-path: inset(-72px -1000px -1000px 0);
  z-index: 1;
}

.wants-grid {
  display: grid;
  grid-auto-rows: 40px;
}

.wants-grid-cell {
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.header-spacer {
  border-right: none;
}

.first-row::before {
  content: "";
  position: absolute;
  top: -1px;
  left: 0;
  width: calc(100% + 1px);
  height: 1px;
  background-color: #ccc;
}

.item-data {
  padding: 2px;
}
</style>