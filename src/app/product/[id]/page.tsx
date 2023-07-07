import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getClient } from '@/lib/gql/ApolloClient';
import { GetProductQuery, GetProductQueryVariables } from '@/lib/gql/__generated__/graphql';
import { productQuery } from '@/lib/gql/operations';
import { METADATA_TITLE_BASE } from '@/lib/shared-metadata';
import Image from 'next/image';
import { ProductType, decodeToShopifyProductId, getProductDimensions } from '@/lib/utils';
import ProductSwiperWrapper from '@/components/swiperWrappers/productSwiperWrapper';
import ProductDecscription from '@/components/productDescription';
import ArrowDoubleSided from '@/components/icons/ArrowDoubledSided';
import RecomendationSwiperWrapper from '@/components/swiperWrappers/recommendationSwiperWrapper';

type Props = {
	params: { id: string };
};

type Product = {
	id: string;
	title: string;
	productType: ProductType;
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
	const productDimensions = getProductDimensions(product.productType);
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
			<div className=" p-4">
				<div className=" text-sm leading-6">
					<ProductDecscription description={product.description} />
					<div className=" h-[1px] w-full bg-gray-200 my-4" />
					<div>
						<ul>
							<li className=" flex flex-row items-center w-20 justify-between">
								<ArrowDoubleSided /> <span>{productDimensions.width}cm</span>
							</li>
							<li className=" flex flex-row items-center w-20 justify-between">
								<ArrowDoubleSided className=" rotate-90" /> <span>{productDimensions.height}cm</span>
							</li>
							<li className=" flex flex-row items-center w-20 justify-between">
								<ArrowDoubleSided className=" -rotate-45" /> <span>{productDimensions.depth}cm</span>
							</li>
						</ul>
					</div>
				</div>
				<div className=" h-[1px] w-full bg-gray-200 my-4" />
				{/* Recommend products from the same collection */}
				<div>
					<span>
						More from collection <i>{product.collections[0].title}</i>
					</span>
					<RecomendationSwiperWrapper>
						<div className=" h-56 w-40 border">Placeholder 1</div>
						<div className=" h-56 w-40 border">Placeholder 2</div>
						<div className=" h-56 w-40 border">Placeholder 3</div>
						<div className=" h-56 w-40 border">Placeholder 4</div>
						<div className=" h-56 w-40 border">Placeholder 5</div>
					</RecomendationSwiperWrapper>
				</div>

				<div className=" h-[1px] w-full bg-gray-200 my-4" />
				{/* Recomment products from the same product type */}
				<div>
					<span>You may also like</span>
					<RecomendationSwiperWrapper>
						<div className=" h-56 w-40 border">Placeholder 1</div>
						<div className=" h-56 w-40 border">Placeholder 2</div>
						<div className=" h-56 w-40 border">Placeholder 3</div>
						<div className=" h-56 w-40 border">Placeholder 4</div>
						<div className=" h-56 w-40 border">Placeholder 5</div>
					</RecomendationSwiperWrapper>
				</div>
			</div>

			<div className=" fixed bottom-0 w-full flex flex-col bg-white bg-opacity-95 text-primary p-4 z-20 border-t">
				<div className=" flex flex-row justify-between pb-4 px-1 items-center">
					<div className=" text-lg">{product.title}</div>
					<div className=" text-sm">
						<span>{product.price.amount}</span>{' '}
						<span>{product.price.currencyCode === 'EUR' ? '€' : product.price.currencyCode}</span>
					</div>
				</div>
				<div className=" w-full">
					<div className=" rounded-lg w-full bg-primary text-center p-3 text-white">Add to Cart</div>
				</div>
			</div>
		</div>
	);
}

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
			// if productType is of type ProductType, then use it, otherwise assign "unknown"
			productType: ProductType.includes(data.product.productType as ProductType)
				? (data.product.productType as ProductType)
				: 'unknown',
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
