import { InventoryProduct } from '@/app/inventory/page';
import { queryProductsByIds } from '@/lib/gql/utils/sharedQueries';
import CartProductOverview from './cartProductOverview';
import OrderSummary from './orderSummary';
import OrderSummaryMobile from './orderSummaryMobile';

type CartProps = {
	encodedProductIds: string[] | string;
};

export default async function Cart({ encodedProductIds }: CartProps) {
	const products: InventoryProduct[] = await queryProductsByIds(
		Array.isArray(encodedProductIds) ? encodedProductIds : [encodedProductIds],
	);

	return (
		<div className=" w-full max-w-[1680px] md:px-12">
			<div className=" md:flex md:gap-12">
				<div className=" w-full relative md:w-3/5">{products && <CartProductOverview products={products} />}</div>
				<div className="md:w-2/5 flex flex-col pb-8">
					<OrderSummary products={products} />
				</div>
			</div>

			<OrderSummaryMobile products={products} />
		</div>
	);
}
