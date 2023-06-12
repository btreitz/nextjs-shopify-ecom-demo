import { Metadata } from 'next';
import Link from 'next/link';

import { BASE_METADATA, METADATA_TITLE_BASE } from '@/lib/shared-metadata';
import { getClient } from '@/lib/gql/ApolloClient';
import { productsInCollectionQuery, productsQuery } from '@/lib/gql/operations';
import {
	GetProductsInCollectionQuery,
	GetProductsInCollectionQueryVariables,
	GetProductsQuery,
	GetProductsQueryVariables,
} from '@/lib/gql/__generated__/graphql';
import {
	SUPPORTED_COLLECTION_QUERY_PARAMS,
	SUPPORTED_PRODUCT_QUERY_PARAMS,
	SupportedQueryParams,
	combineOR,
} from '@/lib/gql/utils/queryParams';

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

export default async function Page({ searchParams }: Props) {
	const paramsList: [string, string][] = Object.entries(searchParams);
	const products = await queryProductsById(paramsList);
	return (
		<>
			<div className=" flex flex-row flex-wrap">
				{products.map((product, index) => (
					<Link href={`/product/${product.id}`} key={index}>
						<p className=" border rounded m-5 p-4">
							<span>{product.title}</span>
							<br />
							<span>{product.id}</span>
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

function generateQueryParamBySupport(params: [string, string][], SUPPORTED_QUERY_PARAMS: SupportedQueryParams) {
	return (
		params
			// filter out unsupported query params
			.filter(([key]) => key in SUPPORTED_QUERY_PARAMS)
			// combine multiple elements of an individual query param with OR
			.map(([key, value]) => {
				const supportedKey = key as keyof typeof SUPPORTED_QUERY_PARAMS;
				return combineOR(SUPPORTED_QUERY_PARAMS[supportedKey], value.split(','));
			})
			// combine all seperate query params with AND
			.map((query) => `(${query})`)
			.join(' AND ')
	);
}

async function generateProductQuery(params: [string, string][]) {
	// seperate collection query params from product query params
	const { collectionParams, productParams } = params.reduce(
		(acc, [key, value]) => {
			if (key in SUPPORTED_COLLECTION_QUERY_PARAMS) {
				acc.collectionParams.push([key, value]);
			} else if (key in SUPPORTED_PRODUCT_QUERY_PARAMS) {
				acc.productParams.push([key, value]);
			}
			return acc;
		},
		{ collectionParams: [] as [string, string][], productParams: [] as [string, string][] },
	);

	const productQuery = generateProductQueryParam(productParams);

	if (collectionParams.length > 0) {
		const collectionTitles;
		const collectionQuery = combineOR(SUPPORTED_COLLECTION_QUERY_PARAMS.collection, collections.split(','));
		console.log('query');
		console.log(query);
		return await getClient().query<GetProductsInCollectionQuery, GetProductsInCollectionQueryVariables>({
			query: productsInCollectionQuery,
			variables: { maxProducts: 100, collectionQuery },
		});
	}
	return await getClient().query<GetProductsQuery, GetProductsQueryVariables>({
		query: productsQuery,
		variables: { maxProducts: 100, productQuery },
	});
}

// type guard to check if result is GetProductsInCollectionQuery
function isGetProductsInCollectionQuery(
	result: GetProductsInCollectionQuery | GetProductsQuery,
): result is GetProductsInCollectionQuery {
	return (result as GetProductsInCollectionQuery).collections !== undefined;
}

function createProductFromQueryResponse(product: GetProductsQuery['products']['edges'][0]) {
	const { collections, id, title, productType } = product.node;
	const encodedId = Buffer.from(id, 'utf-8').toString('base64');
	return {
		id: encodedId,
		title,
		type: productType,
		collections: collections.nodes.map(({ id, title }) => {
			return { id, title };
		}),
	};
}

async function queryProductsById(params: [string, string][]) {
	const paramsMap = new Map(params);
	const { data } = await generateProductQuery(params);

	if (isGetProductsInCollectionQuery(data)) {
		return data.collections.edges.flatMap((collection) => {
			return collection.node.products.edges.map(createProductFromQueryResponse);
		});
	}

	return data.products.edges.map(createProductFromQueryResponse);
}
