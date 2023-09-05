import { gql } from '../../__generated__/gql';

export const productOfSameTypeQuery = gql(/* GraphQL */ `
	query getProductsOfSameType($query: String!) {
		products(first: 10, query: $query) {
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
`);

export const productsInCollectionQuery = gql(/* GraphQL */ `
	query getProductsInCollection($collectionId: ID!) {
		collection(id: $collectionId) {
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
					description
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
