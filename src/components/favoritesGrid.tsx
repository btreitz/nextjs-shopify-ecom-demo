import { InventoryProduct } from '@/app/inventory/page';
import ProductGrid from './productGrid';
import { queryProductsByIds } from '@/lib/gql/utils/sharedQueries';

type FavoritesGridProps = {
	encodedProductIds: string[] | string;
};

async function FavoritesGrid({ encodedProductIds }: FavoritesGridProps) {
	const products: InventoryProduct[] = await queryProductsByIds(
		Array.isArray(encodedProductIds) ? encodedProductIds : [encodedProductIds],
	);

	return <ProductGrid products={products} />;
}

export default FavoritesGrid as unknown as React.FC<FavoritesGridProps>;
