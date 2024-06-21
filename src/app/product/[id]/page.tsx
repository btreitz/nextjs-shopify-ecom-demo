import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { getClient } from '@/lib/gql/ApolloClient';
import {
	GetProductQuery,
	GetProductQueryVariables,
	GetProductsInCollectionQuery,
	GetProductsInCollectionQueryVariables,
	GetProductsOfSameTypeQuery,
	GetProductsOfSameTypeQueryVariables,
} from '@/lib/gql/__generated__/graphql';
import { productOfSameTypeQuery, productQuery, productsInCollectionQuery } from '@/lib/gql/operations/product';
import { METADATA_TITLE_BASE } from '@/lib/shared-metadata';
import { ProductType, decodeToShopifyProductId, encodeShopifyProductId, getProductDimensions } from '@/utils';
import ProductSwiperWrapper from '@/components/swiperWrappers/productSwiperWrapper';
import ProductDecscription from '@/components/productDescription';
import ArrowDoubleSided from '@/components/icons/ArrowDoubledSided';
import RecomendationSwiperWrapper from '@/components/swiperWrappers/recommendationSwiperWrapper';
import ScalableImage from '@/components/scalableImage';
import AddToCart from '@/components/addToCart';

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
		product.collections[0].title,
	);

	return (
		<div className=" w-full max-w-[1680px] md:px-12">
			<div className=" md:flex md:gap-12">
				<div className=" w-full relative md:w-3/5">
					<ProductSwiperWrapper props={{ className: ' w-full' }} productTitle={product.title} productId={product.id}>
						{product.images.map((image, index) => (
							<Image
								key={index}
								src={image.src}
								alt={product.title}
								className=" object-cover ml-auto mr-auto w-full"
								width={image.dimensions?.width || 768}
								height={image.dimensions?.height || 1024}
							/>
						))}
					</ProductSwiperWrapper>
				</div>
				<div className="md:w-2/5 flex flex-col pb-8">
					<div className=" p-4 w-full md:p-8 md:bg-light sticky top-20">
						<div className=" hidden md:block">
							<h1 className=" text-3xl font-light py-2">{product.title}</h1>
							<div className=" py-4">
								<span>{product.price.amount}</span>{' '}
								<span>{product.price.currencyCode === 'EUR' ? '€' : product.price.currencyCode}</span>
							</div>
						</div>
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
						<div className=" hidden md:block pt-8">
							<AddToCart
								encodedId={encodeShopifyProductId(product.id)}
								className=" rounded-lg w-full bg-primary text-center p-3 text-white hover:opacity-80 hover:cursor-pointer transition-opacity duration-150"
							/>
						</div>
					</div>
				</div>
			</div>
			{/* About the collection */}
			<div className=" px-4 pb-6 md:px-0">
				<div className=" h-[1px] w-full bg-gray-200 mb-4 md:opacity-0" />
				<div className=" pb-4 md:pt-4">
					<div>
						<h2 className=" py-2 mb-3 md:text-2xl">
							Collection <span className=" font-medium">{product.collections[0].title}</span>
						</h2>
						<p className=" text-sm">{product.collections[0].description}</p>
					</div>
					{/* Recommend products from the same collection */}
					{recommendedFromCollection.length > 0 && (
						<div className=" mt-5">
							<RecomendationSwiperWrapper>
								{recommendedFromCollection.map((product, index) => (
									<Link href={`/product/${product.id}`} key={index} className=" h-full">
										<div className=" w-full rounded-lg overflow-hidden aspect-square flex items-end">
											<ScalableImage
												animationTriggers={{ hover: true }}
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
				</div>
				{/* Recomment products from the same product type */}
				{recommendedFromProductType.length > 0 && (
					<div className=" pb-8">
						<div className=" h-[1px] w-full bg-gray-200 my-4 md:opacity-0" />
						<div>
							<h2 className=" py-2 mb-4 md:text-2xl">You may also like</h2>
							<RecomendationSwiperWrapper>
								{recommendedFromProductType.map((product, index) => (
									<Link href={`/product/${product.id}`} key={index} className=" h-full">
										<div className=" w-full rounded-lg overflow-hidden aspect-square flex items-end">
											<ScalableImage
												animationTriggers={{ hover: true }}
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
					</div>
				)}
			</div>

			<div className=" md:hidden fixed bottom-0 w-full flex flex-col bg-light bg-opacity-95 text-primary p-4 z-20 border-t">
				<div className=" flex flex-row justify-between pb-4 px-1 items-center">
					<div className=" text-lg">{product.title}</div>
					<div className=" text-sm">
						<span>{product.price.amount}</span>{' '}
						<span>{product.price.currencyCode === 'EUR' ? '€' : product.price.currencyCode}</span>
					</div>
				</div>
				<div className=" w-full">
					<AddToCart
						encodedId={encodeShopifyProductId(product.id)}
						className=" rounded-lg w-full bg-primary text-center p-3 text-white hover:cursor-pointer"
					/>
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

async function queryProductsByProductType(
	productType: string,
	excludedCollectionTitle: string,
): Promise<RecommendedProduct[]> {
	const query = `(product_type:${productType}) NOT (tag:${excludedCollectionTitle})`;
	try {
		const { error, data } = await getClient().query<GetProductsOfSameTypeQuery, GetProductsOfSameTypeQueryVariables>({
			query: productOfSameTypeQuery,
			variables: { query },
		});

		if (error || !data || !data.products) {
			throw new Error(`Products of type ${productType} not found: Error: ${error}`);
		}

		return data.products.nodes.map((node) => ({
			id: encodeShopifyProductId(node.id),
			title: node.title,
			images: {
				dimensions: {
					width: node.images.nodes[0].width,
					height: node.images.nodes[0].height,
				},
				src: node.images.nodes[0].url,
			},
		}));
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
