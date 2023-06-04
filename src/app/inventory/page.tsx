import { Metadata } from 'next';

import { BASE_METADATA, METADATA_TITLE_BASE } from '@/lib/shared-metadata';
import { getClient } from '@/lib/gql/ApolloClient';
import { productsQuery } from '@/lib/gql/operations';

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
			<div className=" flex flex-row flex-wrap">{JSON.stringify(products)}</div>
		</>
	);
}

type Product = {
	id: string;
	title: string;
};

async function queryProductsById(params: [string, string][]): Promise<Product[]> {
	// TODO: query products by query params
	console.log('params');
	console.log(params);

	const { data } = await getClient().query({ query: productsQuery, variables: { maxProducts: 5 } });

	console.log('data');
	console.log(JSON.stringify(data));

	return Promise.resolve([
		{
			id: '1',
			title: 'Product 1',
		},
		{
			id: '2',
			title: 'Product 2',
		},
		{
			id: '3',
			title: 'Product 3',
		},
	]);
}
