import { gql } from '../../__generated__/gql';

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
