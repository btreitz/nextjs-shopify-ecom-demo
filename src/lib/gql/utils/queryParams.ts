export const SUPPORTED_PRODUCT_QUERY_PARAMS = {
	collection: 'tag:',
	category: 'product_type:',
	priceMin: 'variants.price:>=',
	priceMax: 'variants.price:<=',
} as const;

export const SUPPORTED_PRODUCT_SORT_PARAMS = {
	sort: 'sortKey',
} as const;

export function combineOR(paramName: string, values: string[]) {
	return values.map((value) => `(${paramName}${value.trim()})`).join(' OR ');
}
