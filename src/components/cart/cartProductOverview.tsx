import { InventoryProduct } from '@/app/inventory/page';
import CartProduct from './cartProduct';

type CartProductOverviewProps = {
	products: InventoryProduct[];
};

export default function CartProductOverview({ products }: CartProductOverviewProps) {
	return (
		<div>
			{products &&
				products.map(({ id, price, title, images }) => (
					<div key={id}>
						<CartProduct encodedId={id} title={title} price={+price.amount} images={images} />
						<div className=" h-[1px] w-full bg-gray-200 my-4" />
					</div>
				))}
		</div>
	);
}
