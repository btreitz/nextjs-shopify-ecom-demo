import { Metadata } from 'next';
import Link from 'next/link';

import { BASE_METADATA, METADATA_TITLE_BASE } from '@/lib/shared-metadata';
import { getClient } from '@/lib/gql/ApolloClient';
import { productsQuery } from '@/lib/gql/operations';
import { GetProductsQuery, GetProductsQueryVariables } from '@/lib/gql/__generated__/graphql';

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
			<h1>Inventory</h1>
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

async function queryProductsById(params: [string, string][]) {
	// TODO: query products by query params
	console.log('params');
	console.log(params);

	const { data } = await getClient().query<GetProductsQuery, GetProductsQueryVariables>({
		query: productsQuery,
		variables: { maxProducts: 100 },
	});

	console.log('data');
	console.log(JSON.stringify(data));

	return data.products.edges.map((product) => {
		const { collections, id, title } = product.node;
		const encodedId = Buffer.from(id, 'utf-8').toString('base64');
		return {
			id: encodedId,
			title,
			collections: collections.nodes.map(({ id, title }) => {
				return { id, title };
			}),
		};
	});
}
