export function combineOR(paramName: string, values: string[]) {
	return values.map((value) => `(${paramName}:${value.trim()})`).join(' OR ');
}
