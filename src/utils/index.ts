/**
 * Clean query param to conform to URI standards
 */
export function cleanQueryParam(query: string) {
	return encodeURIComponent(query.toLowerCase().replace(/\s/g, '-'));
}

/**
 * Encode Shopify product ID to conform to URI standards
 */
export function encodeShopifyProductId(id: string) {
	return encodeURIComponent(Buffer.from(id).toString('base64'));
}

/**
 * Decode Shopify product ID to conform to URI standards
 */
export function decodeToShopifyProductId(id: string) {
	return Buffer.from(decodeURIComponent(id), 'base64').toString('utf-8');
}

export const ProductType = ['Chairs', 'Tables', 'Lamps', 'unknown'] as const;
export type ProductType = (typeof ProductType)[number];

const DIMENSION_RANGES: {
	[key in ProductType]: { width: [number, number]; height: [number, number]; depth: [number, number] };
} = {
	Chairs: {
		width: [40, 80],
		height: [40, 100],
		depth: [40, 100],
	},
	Tables: {
		width: [80, 200],
		height: [30, 100],
		depth: [50, 200],
	},
	Lamps: {
		width: [10, 20],
		height: [15, 100],
		depth: [20, 50],
	},
	unknown: {
		width: [10, 100],
		height: [10, 100],
		depth: [10, 100],
	},
};

/**
 * Return random dimensions for a product type
 */
export function getProductDimensions(productType: ProductType) {
	const width =
		Math.floor(Math.random() * (DIMENSION_RANGES[productType].width[1] - DIMENSION_RANGES[productType].width[0] + 1)) +
		DIMENSION_RANGES[productType].width[0];
	const height =
		Math.floor(
			Math.random() * (DIMENSION_RANGES[productType].height[1] - DIMENSION_RANGES[productType].height[0] + 1),
		) + DIMENSION_RANGES[productType].height[0];
	const depth =
		Math.floor(Math.random() * (DIMENSION_RANGES[productType].depth[1] - DIMENSION_RANGES[productType].depth[0] + 1)) +
		DIMENSION_RANGES[productType].depth[0];

	return { width, height, depth };
}

export function toStringArray(currentIds: string | string[] | undefined | null): string[] {
	if (typeof currentIds === 'undefined' || currentIds === null) {
		return [];
	} else if (typeof currentIds === 'string') {
		return [currentIds];
	} else {
		return currentIds;
	}
}

export function arraysEqualUnordered(arr1: string[], arr2: string[]): boolean {
	if (arr1.length !== arr2.length) {
		return false;
	}

	const sortedArr1 = [...arr1].sort();
	const sortedArr2 = [...arr2].sort();

	for (let i = 0; i < sortedArr1.length; i++) {
		if (sortedArr1[i] !== sortedArr2[i]) {
			return false;
		}
	}

	return true;
}
