import Listing from "./Listing";
import Want from "./Want";

import _ from "lodash";

export default class Dummy extends Listing {
	children: Listing[];

	constructor(id: number, name: string, children: Listing[]) {
		super(id, name);
		this.children = children;
	}

	getChild(id: number): Listing | undefined {
		return _.find(this.children, { id });
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
