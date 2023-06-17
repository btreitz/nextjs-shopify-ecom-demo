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

export default async function Page({ params }: Props) {
	const product: Product = await queryProductById(params.id);
	return (
		<>
			<h1>{product.id}</h1>
			<p>
				<span>{product.title}</span>
				<br />
			</p>
		</>
	);
}

async function queryProductById(id: string) {
	const decodedId = Buffer.from(decodeURIComponent(id), 'base64').toString('utf-8');

	try {
		const { error, data } = await getClient().query<GetProductQuery, GetProductQueryVariables>({
			query: productQuery,
			variables: { productId: decodedId },
		});

		if (error || !data || !data.product) {
			throw new Error(`Product with id ${id} not found: Error: ${error}`);
		}
		return {
			id: data.product.id,
			title: data.product.title,
		};
	} catch (error) {
		console.error('error', error);
		notFound();
	}
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
