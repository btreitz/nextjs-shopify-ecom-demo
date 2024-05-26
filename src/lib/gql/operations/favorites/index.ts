import { gql } from '../../__generated__/gql';

export const productsByIdsQuery = gql(/* GraphQL */ `
	query getProductsByIds($ids: [ID!]!) {
		nodes(ids: $ids) {
			... on Product {
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
`);
