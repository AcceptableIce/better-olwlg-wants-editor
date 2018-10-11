<template>
  <div :class="cellClasses" @mousedown="startEditing($event)" @focus="setFocus(true)" @mouseover="onMouseOver($event)" @blur="setFocus(false)" @mouseout="setFocus(false)">
    <button class="toggle" @keyup.enter="toggle()" @keyup.space="toggle()" :disabled="isDummyCrossoverCell">
      <accessibility-text>{{accessibilityText}}</accessibility-text>
    </button>
    
    <tooltip class="cell-description-tooltip" :visible="focused" position="bottom" v-html="tooltipText"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import * as wantsStore from "store/WantsStore";
import * as interactivity from "store/InteractivityStore";

import AccessibilityText from "components/AccessibilityText.vue";
import Tooltip from "components/Tooltip.vue";

import { Coordinate, CoordinateBoundries } from "utils/Coordinate";

import Dummy, { WantOrDummy } from "models/Dummy";
import Listing from "models/Listing";
import Want from "models/Want";

@Component({
  components: { Tooltip, AccessibilityText }
})
export default class WantsGridToggleCell extends Vue {
  @Prop({ required: true })
  want!: WantOrDummy;

  @Prop({ required: true })
  listing!: Listing;

  @Prop({ required: true })
  x!: number;

  @Prop({ required: true })
  y!: number;

  focused: boolean = false;

  get toggled(): boolean {
    if(this.want instanceof Dummy) {
      return (<Dummy>this.want).hasChild(this.listing);
    } else {
      return this.listing.hasWant(this.want);
    }
  }

  get cellClasses(): object {
    const pendingMassEdit = this.getPendingMassEdit();

    return {
      "wants-grid-cell": true,
      "toggle-cell": true,
      enabled: this.toggled,
      "pending-enable": pendingMassEdit === "enable",
      "pending-disable": pendingMassEdit === "disable",
      "dummy": this.hasDummy,
      "dummy-crossover": this.isDummyCrossoverCell,
      "deleting": this.want.toDelete
    };
  }

  get isDummyListing(): boolean {
    return this.listing instanceof Dummy;
  }

  get isDummyWant(): boolean {
    return this.want instanceof Dummy;
  }

  get hasDummy(): boolean {
    return this.isDummyWant || this.isDummyListing;
  }

  get isDummyCrossoverCell(): boolean {
    return this.isDummyWant && this.isDummyWant && this.want.id === this.listing.id;
  }

  get tooltipText(): string {
    if(this.isDummyListing) {
      if(this.toggled) {
        return `${this.want.name} is a duplicate of ${this.listing.name}.`;
      } else {
        return `${this.want.name} is <b>not</b> a duplicate of ${this.listing.name}.`
      }
    } else {
      if(this.toggled) {
        return `Trading my ${this.listing.name} for ${this.want.name}.`;
      } else {
        return `<b>Not trading</b> my ${this.listing.name} for ${this.want.name}.`;
      }
    }
  }

  get accessibilityText(): string {
    return this.tooltipText.replace(/<[^>]*>/g, "");
  }

  startEditing(event: MouseEvent) {
    event.preventDefault();

    interactivity.startMassEdit(this.$store, {
      enableAfterRelease: !this.toggled,
      start: this.coordinates
    });
  }

  onMouseOver(event: MouseEvent) {
    if(interactivity.isMassEditing(this.$store)) {
      event.preventDefault();

      interactivity.setMassEditEndCell(this.$store, this.coordinates);
    }

    this.setFocus(true);
  }

  toggle() {
    wantsStore.updateWantStatusByMassEdit(this.$store, {
      isEditing: false,
      enableAfterRelease: !this.toggled,
      startCell: this.coordinates,
      endCell: this.coordinates
    });
  }

  setFocus(focus: boolean) {
    this.focused = focus && !interactivity.isMassEditing(this.$store);
  }

  getPendingMassEdit(): string | undefined {
    const massEditStatus = interactivity.getMassEditStatus(this.$store);

    if(massEditStatus.isEditing && massEditStatus.boundries) {
      const boundries: CoordinateBoundries = massEditStatus.boundries;

      if(boundries.min.x <= this.x && boundries.min.y <= this.y && boundries.max.x >= this.x && boundries.max.y >= this.y) {
        return massEditStatus.enableAfterRelease ? "enable" : "disable";
      }
    }

    return undefined;
  }

  get coordinates(): Coordinate {
    return {
      x: this.x,
      y: this.y
    };
  }

  get cellData(): wantsStore.WantListingPair {
    return {
      want: this.want,
      listing: this.listing
    };
  }
}
</script>

<style scoped>
.toggle-cell {
  position: relative;
}

.toggle {
  position: absolute;
  left: 0;
  top: -1px;
  width: calc(100% + 1px);
  height: calc(100% + 1px);
  background-color: transparent;
  border: none;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.toggle:focus {
  outline: none;
}

.toggle-cell::after,
.toggle:focus::after,
.dummy-crossover .toggle::before,
.enabled .toggle::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.enabled .toggle::before {
  background-color: rgba(0, 0, 0, 0.25);
}

.toggle:focus::after {
  background-color: rgba(0, 0, 200, 0.25);
}

.toggle-cell.pending-enable::after {
  background-color: rgba(0, 200, 0, 0.25);
}

.toggle-cell.pending-disable::after {
  background-color: rgba(200, 0, 0, 0.25);
}

.column-offset-0 .toggle {
  background-color: #e2faff;
}

.column-offset-1 .toggle {
  background-color: #fff0f5;
}

.column-offset-2 .toggle {
  background-color: #fffcf0;
}

.column-offset-3 .toggle {
  background-color: #f8f8ff;
}

.dummy .toggle {
  background-color: #f5fff5;
}

.dummy-crossover .toggle::before {
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 1;
}

.enabled .toggle::before {
  left: 25%;
  top: 25%;
  width: 50%;
  height: 50%;
  background-color: #233177;
  border-radius: 4px;
}

.cell-description-tooltip {
  text-align: center;
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