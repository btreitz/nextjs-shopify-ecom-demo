import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getClient } from '@/lib/gql/ApolloClient';
import { GetProductQuery, GetProductQueryVariables } from '@/lib/gql/__generated__/graphql';
import { productQuery } from '@/lib/gql/operations';
import { METADATA_TITLE_BASE } from '@/lib/shared-metadata';
import Image from 'next/image';

type Props = {
	params: { id: string };
};

type Product = {
	id: string;
	title: string;
	productType: string;
	description: string;
	publishedAt: string;
	images: {
		src: string;
		dimensions: {
			width?: number | null;
			height?: number | null;
		};
	}[];
	collections: { id: string; title: string }[];
	price: {
		amount: string;
		currencyCode: string;
	};
};

export default async function Page({ params }: Props) {
	const product: Product = await queryProductById(params.id);
	return (
		<>
			<h1>{product.title}</h1>
			<span>{product.productType}</span>
			<br />
			<div className=" w-[500px] h-[500px] relative rounded-lg overflow-hidden bg-slate-200">
				<Image alt="product image" src={product.images[0].src} fill />
			</div>
			<span>
				{product.price.amount} {product.price.currencyCode}
			</span>
			<br />
			<span>Collections: {product.collections.map((collection) => collection.title).join(', ')}</span>
			<br />
			<span className=" text-sm">
				<i>{product.description}</i>
			</span>
			<br />
			<span className=" text-sm">{product.publishedAt}</span>
		</>
	);
}

function executeProductQuery(rawId: string) {
	const decodedId = Buffer.from(decodeURIComponent(rawId), 'base64').toString('utf-8');
	return getClient().query<GetProductQuery, GetProductQueryVariables>({
		query: productQuery,
		variables: { productId: decodedId },
	});
}

async function queryProductById(id: string): Promise<Product> {
	try {
		const { error, data } = await executeProductQuery(id);

		if (error || !data || !data.product) {
			throw new Error(`Product with id ${id} not found: Error: ${error}`);
		}

		return {
			id: data.product.id,
			title: data.product.title,
			productType: data.product.productType,
			description: data.product.description,
			publishedAt: data.product.publishedAt,
			images: data.product.images.nodes.map((image) => ({
				dimensions: {
					width: image.width,
					height: image.height,
				},
				src: image.url,
			})),
			collections: data.product.collections.nodes.map(({ id, title }) => ({
				id,
				title,
			})),
			price: {
				amount: data.product.variants.nodes[0].priceV2.amount as string,
				currencyCode: data.product.variants.nodes[0].priceV2.currencyCode,
			},
		};
	} catch (error) {
		console.error('error', error);
		notFound();
	}
}

/**
 * Unfortunately requires own error handling apart from the one in the page, otherwise error boundary is not caught
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = params;
	try {
		const { error, data } = await executeProductQuery(id);

		if (error || !data || !data.product) {
			throw new Error(`Product with id ${id} not found: Error: ${error}`);
		}
		const product = {
			title: data.product?.title || '404',
			description: data.product?.description || 'Product not found',
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
	} catch (error) {
		notFound();
	}
}
