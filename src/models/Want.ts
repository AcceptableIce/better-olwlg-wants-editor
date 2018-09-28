export default class Want {
	id: number;
	bgg_id: number;
	name: string;
	owner: string;
	sweeteners: Want[];

	constructor(id: number, bgg_id: number, name: string, owner: string, sweeteners: Want[] = []) {
		this.id = id;
		this.bgg_id = bgg_id;
		this.name = name;
		this.owner = owner;
		this.sweeteners = sweeteners;
	}
}