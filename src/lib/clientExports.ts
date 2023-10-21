/**
 * This file is used to export everything that can not be exported directly from a client module, due to nextjs limitations.
 */

import { ProductSortKeys } from './gql/__generated__/graphql';
import { SUPPORTED_PRODUCT_SORT_PARAMS } from './gql/utils/queryParams';

export const sortParam: keyof typeof SUPPORTED_PRODUCT_SORT_PARAMS = 'sort';

export const sortVariants = {
	dateDesc: {
		label: 'Date: Newest',
		key: ProductSortKeys.UpdatedAt,
		reverse: false,
	},
	dateAsc: {
		label: 'Date: Oldest',
		key: ProductSortKeys.UpdatedAt,
		reverse: true,
	},
	prizeAsc: {
		label: 'Price: Low to High',
		key: ProductSortKeys.Price,
		reverse: false,
	},
	prizeDesc: {
		label: 'Price: High to Low',
		key: ProductSortKeys.Price,
		reverse: true,
	},
	productType: {
		label: 'Product Type',
		key: ProductSortKeys.ProductType,
		reverse: false,
	},
	name: {
		label: 'Name: A-Z',
		key: ProductSortKeys.Title,
		reverse: false,
	},
} as const;
