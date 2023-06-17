import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getClient } from '@/lib/gql/ApolloClient';
import { GetProductQuery, GetProductQueryVariables } from '@/lib/gql/__generated__/graphql';
import { productQuery } from '@/lib/gql/operations';
import { METADATA_TITLE_BASE } from '@/lib/shared-metadata';

type Props = {
	params: { id: string };
};

type Product = {
	id: string;
	title: string;
};

/*
async function getProductData(id: string): Promise<Product> {
	// decode id from base64
	const decodedId = Buffer.from(id, 'base64').toString('utf-8');

	const product: Product = await new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id: decodedId,
				title: 'Example product that is very good',
				description: 'An example description for the product',
				image: 'https://via.placeholder.com/150',
			});
		}, 2000);
	});
	return product;
}
*/

export default async function Page({ params }: Props) {
	const product: Product = await queryProductById(params.id);
	return (
		<>
			<h1>Hello Product - {product.id}</h1>
			<p>
				<span>{product.title}</span>
				<br />
			</p>
		</>
	);
}

async function queryProductById(id: string) {
	console.log('queryProductById', id);
	const decodedId = Buffer.from(decodeURIComponent(id), 'base64').toString('utf-8');
	console.log('decodedId', decodedId);

	const { data } = await getClient().query<GetProductQuery, GetProductQueryVariables>({
		query: productQuery,
		variables: { productId: decodedId },
	});

	console.log('data', data);

	// if data.product is undefined then re route to 404
	if (!data.product) {
		notFound();
	}

	return {
		id: data.product.id,
		title: data.product.title,
	};
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	// read route product id
	const { id } = params;

	// get the current product from the shopify storefront api
	// const product = await fetch(`https://.../${id}`).then((res) => res.json());

	const product = {
		title: 'Example product that is very good',
		description: 'An example description for the product',
		image: 'https://via.placeholder.com/150',
	};

	// set the fields accordingly to the product
	return {
		title: `${product.title} | ${METADATA_TITLE_BASE}`,
		description: product.description,
		openGraph: {
			title: `${product.title} | ${METADATA_TITLE_BASE}`,
			description: product.description,
			images: [
				{
					url: product.image,
				},
			],
		},
	};
}
