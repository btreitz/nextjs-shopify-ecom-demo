import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import { BASE_METADATA, METADATA_TITLE_BASE } from '@/lib/shared-metadata';
import { getClient } from '@/lib/gql/ApolloClient';
import { productsQuery } from '@/lib/gql/operations/inventory';
import { GetProductsQuery, GetProductsQueryVariables, ProductSortKeys } from '@/lib/gql/__generated__/graphql';
import { SUPPORTED_PRODUCT_QUERY_PARAMS, combineOR } from '@/lib/gql/utils/queryParams';
import { encodeShopifyProductId } from '@/lib/utils';
import { SortVariant } from '@/components/filters/sort';
import { sortVariants, sortParam } from '@/lib/clientExports';

import InventoryFilter from '@/components/inventoryFilter';

export const metadata: Metadata = {
	...BASE_METADATA,
	title: `Collections | ${METADATA_TITLE_BASE}`,
	openGraph: {
		...BASE_METADATA.openGraph,
		title: `Collections | ${METADATA_TITLE_BASE}`,
	},
};

// Disable caching for this page in production -> always fetch data from Shopify
export const dynamic = 'force-dynamic';

type Props = {
	searchParams: Record<string, string>;
};

type InventoryProduct = {
	id: string;
	title: string;
	productType: string;
	collections: {
		id: string;
		title: string;
	}[];
	images: {
		src: string;
		dimensions: {
			width?: number | null;
			height?: number | null;
		};
	}[];
	price: {
		amount: string;
		currencyCode: string;
	};
};

export default async function Page({ searchParams }: Props) {
	const products: InventoryProduct[] = await queryProductsByParams(Object.entries(searchParams));
	const resultCount = products.length;
	return (
		<>
			<div className=" w-full flex flex-col px-4">
				<div className=" flex justify-end text-sm pt-1 pb-4 items-center">
					<div className=" opacity-60 hover:opacity-100">
						{resultCount} {resultCount !== 1 ? 'Results' : 'Result'}
					</div>
				</div>
				<div className=" h-[1px] w-full bg-gray-200 mb-4" />
				<div className=" flex flex-row flex-wrap gap-4">
					{products.map((product, index) => (
						<Link href={`/product/${product.id}`} key={index}>
							<div className=" w-full flex flex-col">
								<Image
									alt="product image"
									src={product.images[0].src}
									className=" object-contain h-full"
									width={product.images[0].dimensions?.width || 768}
									height={product.images[0].dimensions?.height || 1024}
								/>
								<div className=" flex flex-col text-sm py-2 leading-6">
									<span className=" text-base">{product.title}</span>
									<div className=" text-sm opacity-60">
										<span>{product.price.amount}</span>{' '}
										<span>{product.price.currencyCode === 'EUR' ? '€' : product.price.currencyCode}</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
			<InventoryFilter />
		</>
	);
}

/**
 * Generates a query parameter string for product search based on the provided parameters.
 * Only takes in consideretion the supported query parameters.
 * @param params - An array of key-value pairs representing query parameters.
 * @returns The generated query parameter string.
 */
function generateProductQueryParam(params: [string, string][]) {
	return (
		params
			// filter out unsupported query params
			.filter(([key]) => key in SUPPORTED_PRODUCT_QUERY_PARAMS)
			// combine multiple elements of an individual query param with OR
			.map(([key, value]) => {
				const supportedKey = key as keyof typeof SUPPORTED_PRODUCT_QUERY_PARAMS;
				return combineOR(SUPPORTED_PRODUCT_QUERY_PARAMS[supportedKey], value.split(','));
			})
			// combine all seperate query params with AND
			.map((query) => `(${query})`)
			.join(' AND ')
	);
}

function getSortKeyFromSearchParams(params: [string, string][]): { key: ProductSortKeys; reverse: boolean } {
	const sortKeyParam = params.find(([key]) => key === sortParam);
	const sortVariant = sortKeyParam && sortKeyParam[1] in sortVariants ? (sortKeyParam[1] as SortVariant) : 'dateDesc';
	return { key: sortVariants[sortVariant].key, reverse: sortVariants[sortVariant].reverse };
}

function createProductFromQueryResponse(product: GetProductsQuery['products']['edges'][0]): InventoryProduct {
	const { collections, id, title, productType, images, priceRange } = product.node;
	const encodedId = encodeShopifyProductId(id);
	return {
		id: encodedId,
		title,
		productType,
		collections: collections.nodes.map(({ id, title }) => ({ id, title })),
		images: images.nodes.map((image) => ({
			dimensions: {
				width: image.width,
				height: image.height,
			},
			src: image.url,
		})),
		price: {
			amount: priceRange.minVariantPrice.amount,
			currencyCode: priceRange.minVariantPrice.currencyCode,
		},
	};
}

/**
 * Queries products by parameters and returns the corresponding product data.
 * @param params - An array of key-value pairs representing query parameters.
 * @returns An array of products that match the provided query parameters.
 */
async function queryProductsByParams(params: [string, string][]): Promise<InventoryProduct[]> {
	const productQuery = generateProductQueryParam(params);
	const productSortKey = getSortKeyFromSearchParams(params);

	const { data } = await getClient().query<GetProductsQuery, GetProductsQueryVariables>({
		query: productsQuery,
		variables: { maxProducts: 100, productQuery, sortKey: productSortKey.key, reverse: productSortKey.reverse },
	});

	return data.products.edges.map(createProductFromQueryResponse);
}
