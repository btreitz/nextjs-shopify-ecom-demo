import { InventoryProduct } from '@/app/inventory/page';
import ProductGrid from './productGrid';
import { queryProductsByIds } from '@/lib/gql/utils/sharedQueries';

type FacoritesGridProps = {
	encodedProductIds: string[] | string;
};

export default async function FavoritesGrid({ encodedProductIds }: FacoritesGridProps) {
	const products: InventoryProduct[] = await queryProductsByIds(
		Array.isArray(encodedProductIds) ? encodedProductIds : [encodedProductIds],
	);

	return <ProductGrid products={products} />;
}
