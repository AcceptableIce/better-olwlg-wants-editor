<template>
	<div :class="classList">
		<div><span>{{listing.name}}</span></div>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import * as wantsStore from "store/WantsStore";

import Dummy from "models/Dummy";
import Listing from "models/Listing";

@Component
export default class WantsGridHeaderCell extends Vue {
  @Prop({ required: true })
  listing!: Listing;

  @Prop({ required: true })
  index!: number;

  get classList(): object {
    const output: any = {
      "wants-grid-cell": true,
      "header": true,
      "dummy": this.isDummy
    };

    output["column-offset-" + (this.index % 4)] = true;

    return output;
  }

  get isDummy(): boolean {
    return this.listing instanceof Dummy;
  }
}
</script>

<style scoped>
.wants-grid-cell.header {
  position: relative;
  height: 140px;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0;
  width: 32px;
  margin-left: -1px;
  border: none;
  box-sizing: border-box;
  background-color: transparent;
  z-index: -1;
}

.header > div {
  position: relative;
  transform: translate(0px, 30.5px) rotate(315deg);
}

.header > div > span {
  height: 28.28px;
  padding: 1px 20px 1px 36px;
  width: 200px;
  font-size: 1rem;
  line-height: 24px;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  box-sizing: border-box;
}

.column-offset-0 > div > span {
  background-color: #b0e2ff;
}

.column-offset-1 > div > span {
  background-color: #f9d1de;
}

.column-offset-2 > div > span {
  background-color: #fff1bb;
}

.column-offset-3 > div > span {
  background-color: #dcd0f3;
}

.dummy > div > span {
  background-color: #cbffdb;
}
</style>