import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
import ProductPageImage from '@/components/product/productPageImage';
import ProductDetails from '@/components/product/productDetails';
import ProductCollection from '@/components/product/productCollection';
import ProductRecommendations from '@/components/product/productRecommendations';
import ProductOverview from '@/components/product/productOverview';

type Props = {
	params: { id: string };
};

export type Product = {
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

export type RecommendedProduct = {
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
					<ProductPageImage product={product} />
				</div>
				<div className="md:w-2/5 flex flex-col pb-8">
					<ProductDetails product={product} productDimensions={productDimensions} />
				</div>
			</div>
			{/* About the collection */}
			<div className=" px-4 pb-6 md:px-0">
				<div className=" h-[1px] w-full bg-gray-200 mb-4 md:opacity-0" />
				<ProductCollection product={product} recommendedFromCollection={recommendedFromCollection} />
				{/* Recomment products from the same product type */}
				{recommendedFromProductType.length > 0 && (
					<ProductRecommendations recommendedFromProductType={recommendedFromProductType} />
				)}
			</div>
			<ProductOverview product={product} />
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
