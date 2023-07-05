export const SUPPORTED_PRODUCT_QUERY_PARAMS = {
	collection: 'tag',
	category: 'product_type',
} as const;

export function combineOR(paramName: string, values: string[]) {
	return values.map((value) => `(${paramName}:${value.trim()})`).join(' OR ');
}
