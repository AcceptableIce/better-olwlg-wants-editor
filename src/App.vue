<template>
	<div class="wants-editor">
		<wants-grid/>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import AppStore from "store/AppStore";

import WantsGrid from "components/WantsGrid";

@Component({
  store: AppStore,
  components: { WantsGrid }
})
export default class App extends Vue { }
</script>

<style scoped>
.wants-editor {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
</style>