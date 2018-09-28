export interface Coordinate {
	x: number,
	y: number
}

export interface CoordinateBoundries {
	min: Coordinate,
	max: Coordinate
}

export function getBoundries(a: Coordinate, b: Coordinate): CoordinateBoundries {
	return {
		min: {
			x: Math.min(a.x, b.x),
			y: Math.min(a.y, b.y)
		},
		max: {
			x: Math.max(a.x, b.x),
			y: Math.max(a.y, b.y)
		}
	};
}