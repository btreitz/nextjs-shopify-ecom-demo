'use client';

import useLocalStorage from '@/utils/hooks/useLocalStorage';
import { CartLocalStorage } from '../addToCart';
import CheckoutButton from './checkoutButton';
import { SHIPPING_COST, getSubtotal } from './orderSummary';
import { InventoryProduct } from '@/app/inventory/page';

type OrderSummaryMobileProps = {
	products: InventoryProduct[];
};

export default function OrderSummaryMobile({ products }: OrderSummaryMobileProps) {
	const { data: items } = useLocalStorage<CartLocalStorage>({ key: 'ecom-cart' });
	const subtotal = getSubtotal(products, items);
	const total = subtotal + SHIPPING_COST;

	return (
		<div className=" md:hidden fixed bottom-0 w-full flex flex-col bg-light bg-opacity-95 text-primary p-4 z-20 border-t">
			<div className=" flex flex-col pb-4 px-1">
				<div className=" text-lg">Order Summary</div>
				<div className=" text-sm py-3">
					<div className=" flex justify-between">
						<div>Subtotal</div>
						<div>{subtotal.toFixed(2)} €</div>
					</div>
					<div className=" flex justify-between">
						<div>Shipping</div>
						<div>{SHIPPING_COST.toFixed(2)} €</div>
					</div>
					<div className=" flex justify-between">
						<div>Total</div>
						<div>{total.toFixed(2)} €</div>
					</div>
				</div>
			</div>
			<div className=" w-full">
				<CheckoutButton className=" rounded-lg w-full bg-primary text-center p-3 text-white hover:opacity-80 hover:cursor-pointer transition-opacity duration-150" />
			</div>
		</div>
	);
}
