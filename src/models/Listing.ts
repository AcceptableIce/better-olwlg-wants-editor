import Want from "models/Want";

import _ from "lodash";

export default class Listing {
	id: number;
	name: string;

	wants: Want[];

	constructor(id: number, name: string, wants: Want[] = []) {
		this.id = id;
		this.name = name;
		this.wants = wants;
	}

	getWant(id: number): Want | undefined {
		return _.find(this.wants, { id });
	}

	hasWant(want: Want): boolean {
		return this.getWant(want.id) !== undefined;
	}

	addWant(want: Want) {
		const match = this.getWant(want.id);

		if(!match) {
			this.wants.push(want);
		}
	}

	removeWant(want: Want) {
		const match = this.getWant(want.id);

		if(match) {
			this.wants.splice(this.wants.indexOf(match), 1);
		}
	}
}