import { InventoryProduct } from '@/app/inventory/page';
import ProductGrid from './productGrid';
import { decodeToShopifyProductId, encodeShopifyProductId } from '@/utils';
import { getClient } from '@/lib/gql/ApolloClient';
import { productsByIdsQuery } from '@/lib/gql/operations/favorites';
import { GetProductsByIdsQuery, GetProductsByIdsQueryVariables } from '@/lib/gql/__generated__/graphql';

type FacoritesGridProps = {
	encodedProductIds: string[] | string;
};

export default async function FavoritesGrid({ encodedProductIds }: FacoritesGridProps) {
	const products: InventoryProduct[] = await queryProductsByIds(
		Array.isArray(encodedProductIds) ? encodedProductIds : [encodedProductIds],
	);

	return <ProductGrid products={products} />;
}

function filterProducts(nodes: GetProductsByIdsQuery['nodes']) {
	return nodes
		.map((node) => {
			if (!node || node.__typename !== 'Product') {
				return null;
			}
			return node;
		})
		.filter((product) => product !== null);
}

function createProductsFromQueryResponse(nodes: GetProductsByIdsQuery['nodes']): (InventoryProduct | null)[] {
	const products = filterProducts(nodes);

	return products.map((product) => {
		if (!product) {
			return null;
		}
		const { collections, id, title, productType, images, priceRange } = product;
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
	});
}

async function queryProductsByIds(encodedProductIds: string[]): Promise<InventoryProduct[]> {
	const productIds = encodedProductIds.map(decodeToShopifyProductId);

	const { data } = await getClient().query<GetProductsByIdsQuery, GetProductsByIdsQueryVariables>({
		query: productsByIdsQuery,
		variables: { ids: productIds },
	});

	return createProductsFromQueryResponse(data.nodes).filter((product): product is InventoryProduct => product !== null);
}
