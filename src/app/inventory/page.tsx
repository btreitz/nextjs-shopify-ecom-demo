import { Metadata } from 'next';
import Link from 'next/link';

import { BASE_METADATA, METADATA_TITLE_BASE } from '@/lib/shared-metadata';
import { getClient } from '@/lib/gql/ApolloClient';
import { inventoryProductsQuery } from '@/lib/gql/operations';
import { GetProductsQuery, GetProductsQueryVariables } from '@/lib/gql/__generated__/graphql';
import { SUPPORTED_PRODUCT_QUERY_PARAMS, combineOR } from '@/lib/gql/utils/queryParams';
import Image from 'next/image';
import { encodeShopifyProductId } from '@/lib/utils';

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
	return (
		<>
			<div className=" flex flex-row gap-5 flex-wrap">
				{products.map((product, index) => (
					<Link href={`/product/${product.id}`} key={index}>
						<div className=" border border-transparent rounded p-4 w-60 h-80 flex flex-col justify-between text-sm hover:border-slate-300">
							<Image alt="product image" src={product.images[0].src} width={200} height={200} />
							<div className=" flex flex-col">
								<span>{product.title}</span>
								<span>{product.productType}</span>
								<span>Collections: {product.collections.map((collection) => collection.title).join(', ')}</span>
							</div>
						</div>
					</Link>
				))}
			</div>
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

	const { data } = await getClient().query<GetProductsQuery, GetProductsQueryVariables>({
		query: inventoryProductsQuery,
		variables: { maxProducts: 100, productQuery },
	});

	return data.products.edges.map(createProductFromQueryResponse);
}
