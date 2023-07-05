import { gql } from './__generated__/gql';

export const collectionProductsQuery = gql(/* GraphQL */ `
	query getCollectionProducts($firstCollections: Int = 1, $newestFirst: Boolean = true) {
		collections(first: $firstCollections, sortKey: UPDATED_AT, reverse: $newestFirst) {
			nodes {
				id
				title
				description
				updatedAt
				products(first: 10) {
					nodes {
						id
						title
						images(first: 1) {
							nodes {
								height
								width
								url
							}
						}
					}
				}
			}
		}
	}
`);

export const inventoryProductsQuery = gql(/* GraphQL */ `
	query getProducts($productQuery: String = "", $maxProducts: Int = 100) {
		products(query: $productQuery, first: $maxProducts) {
			edges {
				node {
					id
					title
					productType
					images(first: 100) {
						nodes {
							height
							width
							url
						}
					}
					collections(first: 1) {
						nodes {
							id
							title
						}
					}
					priceRange {
						minVariantPrice {
							amount
							currencyCode
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
			description
			publishedAt
			images(first: 100) {
				nodes {
					height
					width
					url
				}
			}
			collections(first: 1) {
				nodes {
					id
					title
				}
			}
			variants(first: 1) {
				nodes {
					priceV2 {
						amount
						currencyCode
					}
				}
			}
		}
	}
`);
