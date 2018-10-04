<template>
	<div class="wants-editor">
    <template v-if="wants.length > 0">
      <wants-grid/>
      <div class="actions" v-if="isEditable">
        <submit-button/>
      </div>
    </template>
    <div class="no-items-message" v-else>
      You haven't added any wants to your wantlist! Add a few, then return here.
    </div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AppStore from "store/AppStore";
import * as WantsStore from "store/WantsStore";

import WantsGrid from "components/WantsGrid.vue";
import SubmitButton from "components/SubmitButton.vue";

import Want from "models/Want";
import Dummy from "models/Dummy";
import Listing from "models/Listing";

type ImportSweetener = {
  name: string,
  bgg_id: number
};

type ImportWant = {
  id: number,
  name: string,
  bgg_id: number,
  owner: string,
  order: number,
  sweeteners: ImportSweetener[]
};

type ImportListing = {
  id: number | string,
  name: string,
  wants: number[],
  order?: number,
  children?: number[]
  isDummy: boolean
};

type ImportData = {
  listId: number,
  editable: boolean,
  wants: ImportWant[],
  listings: ImportListing[]
};

@Component({
  store: AppStore,
  components: { WantsGrid, SubmitButton }
})
export default class App extends Vue {
  @Prop({ default: () => ({}) })
  data!: ImportData;

  get wants(): Want[] {
    return WantsStore.getWants(this.$store);
  }

  get isEditable(): boolean {
    return WantsStore.isEditable(this.$store);
  }

  created() {
    // Recreate the data as a wants state.
    const state: WantsStore.WantsState = {
      listId: -1,
      editable: true,
      listings: [],
      wants: []
    };

    const wantsMap: { [index: number]: Want } = {};
    const listingMap: { [index: number]: Listing } = {};

    state.listId = this.data.listId;
    state.editable = this.data.editable;

    this.data.wants.forEach(wantData => {
      const want = new Want(wantData.id, wantData.bgg_id, wantData.name, wantData.order, wantData.owner);

      wantData.sweeteners.forEach(sweetener => {
        want.sweeteners.push(new Want(
          -1,
          sweetener.bgg_id,
          sweetener.name
        ));
      });

      wantsMap[wantData.id] = want;

      state.wants.push(want);
    });

    this.data.listings.forEach(listingData => {
      let listing: Listing;

      if(listingData.isDummy) {
        listing = new Dummy(<string>listingData.id, listingData.name, <number>listingData.order);

        if(listingData.children) {
          listingData.children.forEach(childId => {
            (<Dummy>listing).addChild(listingMap[childId]);
          });
        }
      } else {
        listing = new Listing(listingData.id, listingData.name);

        listingMap[<number>listingData.id] = listing;
      }

      listingData.wants.forEach(wantId => {
        listing.addWant(wantsMap[wantId]);
      });


      state.listings.push(listing);
    });

    WantsStore.importData(this.$store, state);
  }
}
</script>

<style scoped>
.wants-editor {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 150px;
}

.no-items-message {
  position: relative;
  font-size: 1.25rem;
  text-align: center;
  margin: auto 0;
}
</style>