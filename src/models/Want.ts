export default class Want {
	id: number;
	bgg_id: number;
	name: string;
	owner?: string;
	sweeteners: Want[];

	order: number;

	constructor(id: number, bgg_id: number, name: string, order: number = -1, owner: string | undefined = undefined, sweeteners: Want[] = []) {
		this.id = id;
		this.bgg_id = bgg_id;
		this.name = name;
		this.order = order;
		this.owner = owner;
		this.sweeteners = sweeteners;
	}
}