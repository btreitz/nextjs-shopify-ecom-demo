import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getClient } from '@/lib/gql/ApolloClient';
import { GetProductQuery, GetProductQueryVariables } from '@/lib/gql/__generated__/graphql';
import { productQuery } from '@/lib/gql/operations';
import { METADATA_TITLE_BASE } from '@/lib/shared-metadata';
import Image from 'next/image';
import { decodeToShopifyProductId } from '@/lib/utils';
import ProductSwiperWrapper from '@/components/productSwiperWrapper';
import ProductDecscription from '@/components/productDescription';

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
		<div className="  w-full">
			<div className=" w-full relative">
				<ProductSwiperWrapper props={{ className: ' w-full' }}>
					{product.images.map((image, index) => (
						<div key={index} className=" w-full">
							<Image
								src={image.src}
								alt={product.title}
								className=" object-contain"
								width={image.dimensions?.width || 768}
								height={image.dimensions?.height || 1024}
							/>
							<div className=" h-8 w-full" />
						</div>
					))}
				</ProductSwiperWrapper>
			</div>
			<ProductDecscription description={product.description} />
			<div className=" fixed bottom-0 w-full flex flex-col bg-white bg-opacity-95 text-primary p-4 z-20 border-t">
				<div className=" flex flex-row justify-between pb-4 px-1 items-center">
					<div className=" text-lg">{product.title}</div>
					<div className=" text-sm">
						<span>{product.price.amount}</span> <span>{product.price.currencyCode === 'EUR' ? '€' : '$'}</span>
					</div>
				</div>
				<div className=" w-full">
					<div className=" rounded-lg w-full border border-primary text-center p-3">Add to Cart</div>
				</div>
			</div>
			{/* Recommend products from the same collection */}
			{/* Recomment products from the same product type */}
		</div>
	);
}

/*
<>
<h1>{product.title}</h1>
<span>{product.productType}</span>
<br />
<div className=" w-[500px] max-w-[90%] h-[500px] relative rounded-lg overflow-hidden bg-slate-200">
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
*/

function executeProductQuery(rawId: string) {
	const decodedId = decodeToShopifyProductId(rawId);
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
			title: data.product?.title,
			description: data.product?.description,
			image: data.product?.images.nodes[0].url,
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
