import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { BASE_METADATA, METADATA_TITLE_BASE } from '@/components/utils/shared-metadata';
import { env } from '@/components/utils/env.mjs';

export const metadata: Metadata = {
	...BASE_METADATA,
	title: `Collections | ${METADATA_TITLE_BASE}`,
	openGraph: {
		...BASE_METADATA.openGraph,
		title: `Collections | ${METADATA_TITLE_BASE}`,
	},
};

type Product = {
	id: string;
	title: string;
	description: string;
	image: string;
};

async function getProductsBy(params: [string, string][]): Promise<Product[]> {
	// TODO: fetch products by the given params from shopify storefront api

	const products: Product[] = await new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: '87162387',
					title: 'Product 1',
					description: 'An example description for the product',
					image: 'https://via.placeholder.com/150',
				},
				{
					id: '12389723',
					title: 'Product 2',
					description: 'An example description for the product',
					image: 'https://via.placeholder.com/150',
				},
				{
					id: '9817291',
					title: 'Product 3',
					description: 'An example description for the product',
					image: 'https://via.placeholder.com/150',
				},
				{
					id: '18292738',
					title: 'Product 4',
					description: 'An example description for the product',
					image: 'https://via.placeholder.com/150',
				},
				{
					id: '79879827',
					title: 'Product 5',
					description: 'An example description for the product',
					image: 'https://via.placeholder.com/150',
				},
			]);
		}, 2000);
	});
	return products;
}

type Props = {
	searchParams: Record<string, string>;
};

export default async function Page({ searchParams }: Props) {
	const paramsList: [string, string][] = Object.entries(searchParams);
	const products = await getProductsBy(paramsList);

	console.log('env');
	console.log(env);

	return (
		<>
			<h1>Inventory</h1>
			<div className=" flex flex-row flex-wrap">
				{products.map((product, index) => (
					<Link href={`/product/${product.id}`} key={index}>
						<p className=" border rounded m-5 p-4">
							<span>{product.title}</span>
							<br />
							<span>{product.description}</span>
							<br />
							<Image src={product.image} alt={product.title} width={150} height={150} />
						</p>
					</Link>
				))}
			</div>
		</>
	);
}
