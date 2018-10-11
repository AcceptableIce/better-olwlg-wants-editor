import Listing, { ListingId } from "./Listing";
import Want from "./Want";

import find from "lodash/find";

export default class Dummy extends Listing {
	children: Listing[];

	order: number;
	value: number;

	toDelete: boolean = false;

	constructor(id: string, name: string, order: number, value: number = 0, children: Listing[] = []) {
		super(id, name);
		this.order = order;
		this.value = value;
		this.children = children;
	}

	getChild(id: ListingId): Listing | undefined {
		return find(this.children, { id });
	}

	hasChild(listing: Listing): boolean {
		return this.getChild(listing.id) !== undefined;
	}

	addChild(listing: Listing) {
		const match = this.getChild(listing.id);

		if(!match) {
			this.children.push(listing);
		}
	}

	removeChild(listing: Listing) {
		const match = this.getChild(listing.id);

		if(match) {
			this.children.splice(this.children.indexOf(match), 1);
		}
	}
}

export type WantOrDummy = Want | Dummy;
