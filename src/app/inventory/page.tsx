import { Metadata } from 'next';
import Link from 'next/link';

import { BASE_METADATA, METADATA_TITLE_BASE } from '@/lib/shared-metadata';
import { getClient } from '@/lib/gql/ApolloClient';
import { inventoryProductsQuery } from '@/lib/gql/operations';
import { GetProductsQuery, GetProductsQueryVariables } from '@/lib/gql/__generated__/graphql';
import { SUPPORTED_PRODUCT_QUERY_PARAMS, combineOR } from '@/lib/gql/utils/queryParams';

export const metadata: Metadata = {
	...BASE_METADATA,
	title: `Collections | ${METADATA_TITLE_BASE}`,
	openGraph: {
		...BASE_METADATA.openGraph,
		title: `Collections | ${METADATA_TITLE_BASE}`,
	},
};

type Props = {
	searchParams: Record<string, string>;
};

type InventoryProduct = {
	id: string;
	title: string;
	type: string;
	collections: {
		id: string;
		title: string;
	}[];
};

export default async function Page({ searchParams }: Props) {
	const products: InventoryProduct[] = await queryProductsByParams(Object.entries(searchParams));
	return (
		<>
			<div className=" flex flex-row flex-wrap">
				{products.map((product, index) => (
					<Link href={`/product/${product.id}`} key={index}>
						<p className=" border rounded m-5 p-4">
							<span>{product.title}</span>
							<br />
							<span>{product.type}</span>
							<br />
							<span>Collections: {product.collections.map((collection) => collection.title).join(', ')}</span>
						</p>
					</Link>
				))}
			</div>
		</>
	);
}

/**
 * Generates a query parameter string for product search based on the provided parameters.
 * Only takes in consideretion the supported query parameters.
 * @param params - An array of key-value pairs representing query parameters.
 * @returns The generated query parameter string.
 */
function generateProductQueryParam(params: [string, string][]) {
	return (
		params
			// filter out unsupported query params
			.filter(([key]) => key in SUPPORTED_PRODUCT_QUERY_PARAMS)
			// combine multiple elements of an individual query param with OR
			.map(([key, value]) => {
				const supportedKey = key as keyof typeof SUPPORTED_PRODUCT_QUERY_PARAMS;
				return combineOR(SUPPORTED_PRODUCT_QUERY_PARAMS[supportedKey], value.split(','));
			})
			// combine all seperate query params with AND
			.map((query) => `(${query})`)
			.join(' AND ')
	);
}

function createProductFromQueryResponse(product: GetProductsQuery['products']['edges'][0]): InventoryProduct {
	const { collections, id, title, productType } = product.node;
	const encodedId = encodeURIComponent(Buffer.from(id).toString('base64'));
	return {
		id: encodedId,
		title,
		type: productType,
		collections: collections.nodes.map(({ id, title }) => {
			return { id, title };
		}),
	};
}

/**
 * Queries products by parameters and returns the corresponding product data.
 * @param params - An array of key-value pairs representing query parameters.
 * @returns An array of products that match the provided query parameters.
 */
async function queryProductsByParams(params: [string, string][]): Promise<InventoryProduct[]> {
	const productQuery = generateProductQueryParam(params);

	const { data } = await getClient().query<GetProductsQuery, GetProductsQueryVariables>({
		query: inventoryProductsQuery,
		variables: { maxProducts: 100, productQuery },
	});

	return data.products.edges.map(createProductFromQueryResponse);
}
