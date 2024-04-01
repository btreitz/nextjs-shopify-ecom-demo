import { InventoryProduct } from '@/app/inventory/page';
import ProductImage from './productImage';

type ProductGridProps = {
	products: InventoryProduct[];
};

export default function ProductGrid({ products }: ProductGridProps) {
	return (
		<div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
			{products.map((product, index) => (
				<ProductImage key={index} product={product} />
			))}
		</div>
	);
}
