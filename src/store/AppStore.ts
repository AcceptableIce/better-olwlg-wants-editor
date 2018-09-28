import Vuex, { Store } from "vuex";
import { WantsState, WantsConfiguration } from "store/WantsStore";
import { InteractivityState, InteractivityConfiguration } from "store/InteractivityStore";

import Vue from "vue";

Vue.use(Vuex);

export interface AppState {
	wants: WantsState,
	interactivity: InteractivityState
}

export type AppStore = Store<AppState>;

export default new Store<AppState>({
	modules: {
		wants: WantsConfiguration,
		interactivity: InteractivityConfiguration
	},
	strict: true
});