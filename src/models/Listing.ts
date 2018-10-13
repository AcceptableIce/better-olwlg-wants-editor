import Want from "models/Want";

import Vue from "vue";

export type ListingId = number | string;

export default class Listing {
	id: ListingId;
	name: string;

	wants: { [number: string]: Want } = {};

	constructor(id: ListingId, name: string, wants: Want[] = []) {
		this.id = id;
		this.name = name;

		wants.forEach(want => this.addWant(want));
	}

	hasWant(want: Want): boolean {
		return this.wants[want.id] !== undefined;
	}

	addWant(want: Want) {
		if(!this.hasWant(want)) {
			Vue.set(this.wants, String(want.id), want);
		}
	}

	removeWant(want: Want) {
		if(this.hasWant(want)) {
			Vue.delete(this.wants, String(want.id));
		}
	}
}