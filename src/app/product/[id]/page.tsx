import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getClient } from '@/lib/gql/ApolloClient';
import {
	GetProductQuery,
	GetProductQueryVariables,
	GetProductsInCollectionQuery,
	GetProductsInCollectionQueryVariables,
} from '@/lib/gql/__generated__/graphql';
import { productQuery, productsInCollectionQuery } from '@/lib/gql/operations/product';
import { METADATA_TITLE_BASE } from '@/lib/shared-metadata';
import Image from 'next/image';
import { ProductType, decodeToShopifyProductId, encodeShopifyProductId, getProductDimensions } from '@/lib/utils';
import ProductSwiperWrapper from '@/components/swiperWrappers/productSwiperWrapper';
import ProductDecscription from '@/components/productDescription';
import ArrowDoubleSided from '@/components/icons/ArrowDoubledSided';
import RecomendationSwiperWrapper from '@/components/swiperWrappers/recommendationSwiperWrapper';
import Link from 'next/link';

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
	collections: { id: string; title: string; description: string }[];
	price: {
		amount: string;
		currencyCode: string;
	};
};

type RecommendedProduct = {
	id: string;
	title: string;
	images: {
		src: any;
		dimensions: {
			width: number | null | undefined;
			height: number | null | undefined;
		};
	};
};

export default async function Page({ params }: Props) {
	const product: Product = await queryProductById(params.id);
	const productDimensions = getProductDimensions(product.productType);

	const recommendedFromCollection: RecommendedProduct[] = await queryProductsByCollectionId(
		product.collections[0].id,
		product.id,
	);
	const recommendedFromProductType: RecommendedProduct[] = await queryProductsByProductType(
		product.productType,
		product.collections[0].id,
	);

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
				{/* About the collection */}
				<div>
					<div className=" h-[1px] w-full bg-gray-200 my-4" />
					<div>
						<div className=" mb-3">
							Collection <span className=" font-medium">{product.collections[0].title}</span>
						</div>
						<p className=" text-sm">{product.collections[0].description}</p>
					</div>
				</div>
				{/* Recommend products from the same collection */}
				{recommendedFromCollection.length > 0 && (
					<div className=" mt-5">
						<RecomendationSwiperWrapper>
							{recommendedFromCollection.map((product, index) => (
								<Link href={`/product/${product.id}`} key={index} className=" h-full">
									<div className=" w-full rounded-lg overflow-hidden">
										<Image
											src={product.images.src}
											alt={product.title}
											className=" object-contain"
											width={product.images.dimensions.width || 768}
											height={product.images.dimensions.height || 1024}
										/>
									</div>
									<div className=" w-full pt-3 mb-6 pl-1">{product.title}</div>
								</Link>
							))}
						</RecomendationSwiperWrapper>
					</div>
				)}
				{/* Recomment products from the same product type */}
				{recommendedFromProductType.length > 0 && (
					<>
						<div className=" h-[1px] w-full bg-gray-200 my-4" />
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
					</>
				)}
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
			collections: data.product.collections.nodes.map(({ id, title, description }) => ({
				id,
				title,
				description,
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

async function queryProductsByCollectionId(id: string, currentProductId: string): Promise<RecommendedProduct[]> {
	try {
		const { error, data } = await getClient().query<
			GetProductsInCollectionQuery,
			GetProductsInCollectionQueryVariables
		>({
			query: productsInCollectionQuery,
			variables: { collectionId: id },
		});

		if (error || !data || !data.collection) {
			throw new Error(`Collection with id ${id} not found: Error: ${error}`);
		}

		return data.collection.products.nodes
			.filter((product) => product.id !== currentProductId) // exclude current product
			.map((product) => ({
				id: encodeShopifyProductId(product.id),
				title: product.title,
				images: {
					dimensions: {
						width: product.images.nodes[0].width,
						height: product.images.nodes[0].height,
					},
					src: product.images.nodes[0].url,
				},
			}));
	} catch (error) {
		console.error('error', error);
		return [];
	}
}

async function queryProductsByProductType(id: string, excludedCollectionId: string): Promise<RecommendedProduct[]> {
	try {
		return [];
	} catch (error) {
		console.error('error', error);
		return [];
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
