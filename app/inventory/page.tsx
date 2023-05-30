import { Metadata } from 'next';
import Link from 'next/link';

import { BASE_METADATA, METADATA_TITLE_BASE } from '@/components/utils/shared-metadata';
import { GetFirstProductsType, fetchStorefront, getFirstProducts } from '@/components/gql/index';

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
						</p>
					</Link>
				))}
			</div>
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

	const { data } = await fetchStorefront<GetFirstProductsType>({ body: getFirstProducts(5) });

	return data.products.edges.map((edge) => {
		const product = edge.node;
		return {
			// encode id to base64
			id: Buffer.from(product.id, 'utf-8').toString('base64'),
			title: product.title,
		};
	});
}
