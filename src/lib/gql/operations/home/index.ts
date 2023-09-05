import { gql } from '../../__generated__/gql';

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
