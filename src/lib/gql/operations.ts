import { gql } from '@apollo/client';

/* TEST APOLLO CLIENT */
export const productsQuery = gql`
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
`;

export const productsInCollectionQuery = gql`
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
`;
