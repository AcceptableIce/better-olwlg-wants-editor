import { Store, StoreOptions, ActionContext } from "vuex";
import { getStoreAccessors } from "vuex-typescript";
import { AppState } from "store/AppStore";
import _ from "lodash";

import Want from "models/Want";
import Listing from "models/Listing";

import { Coordinate, CoordinateBoundries, getBoundries } from "utils/Coordinate";

export interface MassEditState {
	isEditing: boolean,
	enableAfterRelease: boolean,
	startCell?: Coordinate,
	endCell?: Coordinate,
	boundries?: CoordinateBoundries
}

export interface InteractivityState {
	massEdit: MassEditState
}

type InteractivityContext = ActionContext<InteractivityState, AppState>;

export const InteractivityConfiguration = {
	namespaced: true,

	state: {
		massEdit: {
			isEditing: false,
			enableAfterRelease: false,
			startCell: undefined,
			endCell: undefined,
			boundries: undefined
		}
	},

	getters: {
		isMassEditing(state: InteractivityState): boolean {
			return state.massEdit.isEditing;
		},

		getMassEditStatus(state: InteractivityState): MassEditState {
			return _.clone(state.massEdit);
		}
	},

	mutations: {
		startMassEdit(state: InteractivityState, payload: { enableAfterRelease: boolean, start: Coordinate }) {
			state.massEdit.isEditing = true;
			state.massEdit.startCell = payload.start;
			state.massEdit.endCell = _.clone(payload.start);
			state.massEdit.enableAfterRelease = payload.enableAfterRelease;
			state.massEdit.boundries = getBoundries(state.massEdit.startCell, state.massEdit.endCell)
		},

		stopMassEdit(state: InteractivityState) {
			state.massEdit.isEditing = false;
			state.massEdit.startCell = undefined;
			state.massEdit.endCell = undefined;
			state.massEdit.boundries = undefined;
		},

		setMassEditEndCell(state: InteractivityState, cell: Coordinate) {
			state.massEdit.endCell = cell;
			state.massEdit.boundries = getBoundries(state.massEdit.startCell, state.massEdit.endCell)
		}
	}
}

const { commit, read, dispatch } = getStoreAccessors<InteractivityState, AppState>("interactivity");

const getters = InteractivityConfiguration.getters;

export const isMassEditing = read(getters.isMassEditing);
export const getMassEditStatus = read(getters.getMassEditStatus);

const mutations = InteractivityConfiguration.mutations;

export const startMassEdit = commit(mutations.startMassEdit);
export const stopMassEdit = commit(mutations.stopMassEdit);
export const setMassEditEndCell = commit(mutations.setMassEditEndCell);
