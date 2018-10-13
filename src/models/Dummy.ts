import Listing, { ListingId } from "./Listing";
import Want from "./Want";

import Vue from "vue";

export default class Dummy extends Listing {
	children: { [index: string]: Listing } = {};

	order: number;
	value: number;

	toDelete: boolean = false;

	constructor(id: string, name: string, order: number, value: number = 0, children: Listing[] = []) {
		super(id, name);

		this.order = order;
		this.value = value;

		children.forEach(child => this.addChild(child));
	}

	hasChild(listing: Listing): boolean {
		return this.children[listing.id] !== undefined;
	}

	addChild(listing: Listing) {
		if(!this.hasChild(listing)) {
			Vue.set(this.children, String(listing.id), listing);
		}
	}

	removeChild(listing: Listing) {
		if(this.hasChild(listing)) {
			Vue.delete(this.children, String(listing.id));
		}
	}
}

export type WantOrDummy = Want | Dummy;
