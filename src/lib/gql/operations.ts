import { gql } from './__generated__/gql';

/* TEST APOLLO CLIENT */
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
	query getProductsInCollection($maxProducts: Int!, $collectionTitle: String!) {
		collections(query: "title:$collectionTitle", first: 1) {
			edges {
				node {
					title
					id
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
