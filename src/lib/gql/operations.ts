import { gql } from './__generated__/gql';

export const inventoryProductsQuery = gql(/* GraphQL */ `
	query getProducts($productQuery: String = "", $maxProducts: Int = 100) {
		products(query: $productQuery, first: $maxProducts) {
			edges {
				node {
					id
					title
					productType
					collections(first: 1) {
						nodes {
							id
							title
						}
					}
				}
			}
		}
	}
`);

export const productQuery = gql(/* GraphQL */ `
	query getProduct($productId: ID!) {
		product(id: $productId) {
			id
			title
			productType
			collections(first: 1) {
				nodes {
					id
					title
				}
			}
			description
			publishedAt
		}
	}
`);
