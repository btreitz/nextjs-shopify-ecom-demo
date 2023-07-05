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
