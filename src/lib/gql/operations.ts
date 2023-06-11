import { gql } from './__generated__/gql';

export const productsQuery = gql(/* GraphQL */ `
	query getProducts($maxProducts: Int!) {
		products(first: $maxProducts) {
			edges {
				node {
					id
					title
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

export const productsInCollectionQuery = gql(/* GraphQL */ `
	query getProductsInCollection($maxProducts: Int!, $query: String!, $maxCollections: Int = 100) {
		collections(query: $query, first: $maxCollections) {
			edges {
				node {
					products(first: $maxProducts) {
						edges {
							node {
								id
								title
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
			}
		}
	}
`);
