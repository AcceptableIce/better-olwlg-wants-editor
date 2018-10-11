export default class Want {
	id: number;
	bgg_id: number;
	name: string;
	owner?: string;
	sweeteners: Want[];

	order: number;
	value: number;

	toDelete: boolean = false;

	constructor(id: number, bgg_id: number, name: string, order: number = -1, value: number = 0, owner: string | undefined = undefined, sweeteners: Want[] = []) {
		this.id = id;
		this.bgg_id = bgg_id;
		this.name = name;
		this.order = order;
		this.value = value;
		this.owner = owner;
		this.sweeteners = sweeteners;
	}
}