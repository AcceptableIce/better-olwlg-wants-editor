import { Store, StoreOptions, ActionContext } from "vuex";
import { getStoreAccessors } from "vuex-typescript";
import { AppState } from "store/AppStore";
import _ from "lodash";
import Want from "models/Want";
import Listing from "models/Listing";
import Dummy, { WantOrDummy } from "models/Dummy";

import { MassEditState } from "store/InteractivityStore";

import { getBoundries, Coordinate, CoordinateBoundries } from "utils/Coordinate";

export interface WantListingPair {
	want: WantOrDummy,
	listing: Listing
}

export interface WantsState {
	wants: Want[],
	listings: Listing[]
}

const findWant = (state: WantsState, id: number) => _.find(state.wants, want => want.id === id);
const findListing = (state: WantsState, id: number) => _.find(state.listings, listing => listing.id === id);

type WantsContext = ActionContext<WantsState, AppState>;

const want1 = new Want(1, 175914, "Want 1", "AcceptableIce");
const listing2 = new Listing(2, "Listing 2");

export const WantsConfiguration = {
	namespaced: true,

	state: {
		wants: [
			want1,
			new Want(2, 175914, "Want 2", "AcceptableIce", [
				new Want(3, 1000, "SweetnerTest", "AcceptableIce")
			]),
			new Want(3, 123, "Game with a Longer Name than the Rest", "AcceptableIce")
		],
		listings: [
			new Listing(1, "Listing 1", [want1]),
			listing2,
			new Listing(3, "Listing 3"),
			new Listing(4, "Listing 4"),
			new Dummy(5, "TestDummy", [listing2])
		]
	},

	getters: {
		getWants(state: WantsState) {
			return state.wants.map(_.cloneDeep);
		},

		getWantById(state: WantsState) {
			return (id: number) => _.cloneDeep(findWant(state, id));
		},

		getListings(state: WantsState) {
			return state.listings.map(_.cloneDeep);
		},

		getListingById(state: WantsState) {
			return (id: number) => _.cloneDeep(findListing(state, id));
		},

		getDummies(state: WantsState): Dummy[] {
			return <Dummy[]>state.listings.filter(item => item instanceof Dummy).map(_.cloneDeep);
		},

	},

	mutations: {
		addWants(state: WantsState, wants: Want[]) {
			state.wants.push(...wants);
		},

		addListings(state: WantsState, listings: Listing[]) {
			state.listings.push(...listings);
		},

		addWantToListing(state: WantsState, payload: WantListingPair) {
			const listing = findListing(state, payload.listing.id);
			const want = findWant(state, payload.want.id);

			if(listing && want) {
				listing.addWant(want);
			}
		},

		removeWantFromListing(state: WantsState, payload: WantListingPair) {
			const listing = findListing(state, payload.listing.id);
			const want = findWant(state, payload.want.id);

			if(listing && want) {
				listing.removeWant(want);
			}
		},

		addListingToDummy(state: WantsState, payload: WantListingPair) {
			const listing = findListing(state, payload.listing.id);
			const dummy = <Dummy>findListing(state, payload.want.id);

			if(listing && dummy) {
				dummy.addChild(listing);
			}
		},

		removeListingFromDummy(state: WantsState, payload: WantListingPair) {
			const listing = findListing(state, payload.listing.id);
			const dummy = <Dummy>findListing(state, payload.want.id);

			if(listing && dummy) {
				dummy.removeChild(listing);
			}
		},

		updateWantStatusByMassEdit(state: WantsState, massEditState: MassEditState) {
			if(massEditState.startCell && massEditState.endCell) {
				const boundries: CoordinateBoundries = getBoundries(massEditState.startCell, massEditState.endCell);

				for(let y = boundries.min.y; y <= boundries.max.y; y += 1) {
					for(let x = boundries.min.x; x <= boundries.max.x; x += 1) {
						let want: WantOrDummy = state.wants[y];
						const listing = state.listings[x];

						if(y >= state.wants.length) {
							// The want is a dummy
							want = <Dummy>(state.listings.filter(x => x instanceof Dummy)[y - state.wants.length]);
						}

						if(want && listing) {
							if(want instanceof Dummy) {
								const dummy = <Dummy>want;

								if(massEditState.enableAfterRelease) {
									dummy.addChild(listing);
								} else {
									dummy.removeChild(listing);
								}
							} else {
								if(massEditState.enableAfterRelease) {
									listing.addWant(want);
								} else {
									listing.removeWant(want);
								}
							}
						}
					}
				}
			}
		}
	}
}

const { commit, read, dispatch } = getStoreAccessors<WantsState, AppState>("wants");

const getters = WantsConfiguration.getters;

export const getWants = read(getters.getWants);
export const getWantById = read(getters.getWantById);
export const getListings = read(getters.getListings);
export const getListingById = read(getters.getListingById);
export const getDummies = read(getters.getDummies);

const mutations = WantsConfiguration.mutations;

export const addWants = commit(mutations.addWants);
export const addListings = commit(mutations.addListings);
export const addWantToListing = commit(mutations.addWantToListing);
export const removeWantFromListing = commit(mutations.removeWantFromListing);
export const addListingToDummy = commit(mutations.addListingToDummy);
export const removeListingFromDummy = commit(mutations.removeListingFromDummy);
export const updateWantStatusByMassEdit = commit(mutations.updateWantStatusByMassEdit);