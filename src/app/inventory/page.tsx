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
import { combineOR } from '@/lib/gql/utils/queryParams';

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
							<span>Collections: {product.collections.map((collection) => collection.title).join(', ')}</span>
						</p>
					</Link>
				))}
			</div>
		</>
	);
}

function generateCollectionQueryParam(collections: string) {
	return combineOR('title', collections.split(','));
}

async function generateProductQuery(params: Map<string, string>) {
	const collections = params.get('collection');
	if (collections) {
		const query = generateCollectionQueryParam(collections);
		console.log('query');
		console.log(query);
		return await getClient().query<GetProductsInCollectionQuery, GetProductsInCollectionQueryVariables>({
			query: productsInCollectionQuery,
			variables: { maxProducts: 100, query },
		});
	}
	return await getClient().query<GetProductsQuery, GetProductsQueryVariables>({
		query: productsQuery,
		variables: { maxProducts: 100 },
	});
}

// type guard to check if result is GetProductsInCollectionQuery
function isGetProductsInCollectionQuery(
	result: GetProductsInCollectionQuery | GetProductsQuery,
): result is GetProductsInCollectionQuery {
	return (result as GetProductsInCollectionQuery).collections !== undefined;
}

function createProductFromQueryResponse(product: GetProductsQuery['products']['edges'][0]) {
	const { collections, id, title } = product.node;
	const encodedId = Buffer.from(id, 'utf-8').toString('base64');
	return {
		id: encodedId,
		title,
		collections: collections.nodes.map(({ id, title }) => {
			return { id, title };
		}),
	};
}

async function queryProductsById(params: [string, string][]) {
	const paramsMap = new Map(params);
	const { data } = await generateProductQuery(paramsMap);

	if (isGetProductsInCollectionQuery(data)) {
		return data.collections.edges.flatMap((collection) => {
			return collection.node.products.edges.map(createProductFromQueryResponse);
		});
	}

	return data.products.edges.map(createProductFromQueryResponse);
}
