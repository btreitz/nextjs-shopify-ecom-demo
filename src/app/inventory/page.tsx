import { Metadata } from 'next';

import { BASE_METADATA, METADATA_TITLE_BASE } from '@/lib/shared-metadata';
import { getClient } from '@/lib/gql/ApolloClient';
import { productsQuery } from '@/lib/gql/operations/inventory';
import { GetProductsQuery, GetProductsQueryVariables, ProductSortKeys } from '@/lib/gql/__generated__/graphql';
import { SUPPORTED_PRODUCT_QUERY_PARAMS, combineOR } from '@/lib/gql/utils/queryParams';
import { encodeShopifyProductId } from '@/lib/utils';
import { SortVariant } from '@/components/filters/sort';
import { sortVariants, sortParam } from '@/lib/clientExports';

import InventoryFilter from '@/components/inventoryFilter';
import ProductImage from '@/components/productImage';

export const metadata: Metadata = {
	...BASE_METADATA,
	title: `Collections | ${METADATA_TITLE_BASE}`,
	openGraph: {
		...BASE_METADATA.openGraph,
		title: `Collections | ${METADATA_TITLE_BASE}`,
	},
};

export const revalidate = 3600; // revalidate the data at most every hour

type Props = {
	searchParams: Record<string, string>;
};

export type ImageDetails = {
	src: string;
	dimensions: {
		width?: number | null;
		height?: number | null;
	};
};

export type InventoryProduct = {
	id: string;
	title: string;
	productType: string;
	collections: {
		id: string;
		title: string;
	}[];
	images: ImageDetails[];
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
			<div className=" w-full max-w-[1680px] flex flex-col px-4 pb-16 lg:pb-40">
				<div className=" flex justify-end text-sm pt-1 pb-4 items-center">
					<div className=" opacity-60 hover:opacity-100">
						{resultCount} {resultCount !== 1 ? 'Results' : 'Result'}
					</div>
				</div>
				<div className=" h-[1px] w-full bg-gray-200 mb-4" />
				<div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
					{products.map((product, index) => (
						<ProductImage key={index} product={product} />
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
