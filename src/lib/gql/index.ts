import { env } from '../env.mjs';

export async function fetchStorefront<T>(init?: RequestInit | undefined) {
	type StorefrontResponse = {
		data: T;
	};
	const response: StorefrontResponse = await fetch(env.SHOPIFY_STOREFRONT_API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Shopify-Storefront-Access-Token': env.SHOPIFY_STOREFRONT_API_ACCESS_TOKEN,
		},
		...init,
	}).then((response) => response.json());

	return response;
}

export type GetFirstProductsType = {
	products: {
		edges: {
			node: {
				id: string;
				title: string;
			};
		}[];
	};
};

export const getFirstProducts = (first: number = 1) => {
	return JSON.stringify({
		query: `
            query FirstProducts($first: Int!) {
                products(first: $first) {
                    edges {
                        node {
                            id
                            title
                        }
                    }
                }
            }
        `,
		variables: { first },
	});
};
