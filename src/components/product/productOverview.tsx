import { Product } from '@/app/product/[id]/page';
import AddToCart from '../addToCart';
import { encodeShopifyProductId } from '@/utils';

type ProductOverviewProps = {
	product: Product;
};

export default function ProductOverview({ product }: ProductOverviewProps) {
	return (
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
	);
}
