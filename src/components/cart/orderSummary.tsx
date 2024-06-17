'use client';

import useLocalStorage from '@/utils/hooks/useLocalStorage';
import CheckoutButton from './checkoutButton';
import { CartLocalStorage } from '../addToCart';
import { InventoryProduct } from '@/app/inventory/page';

export const SHIPPING_COST = 50;

type OrderSummaryProps = {
	products: InventoryProduct[];
};

export default function OrderSummary({ products }: OrderSummaryProps) {
	const { data: items } = useLocalStorage<CartLocalStorage>({ key: 'ecom-cart' });
	const subtotal = getSubtotal(products, items);
	const total = subtotal + SHIPPING_COST;

	return (
		<div className=" p-4 w-full md:p-8 md:bg-light sticky top-20">
			<div className=" hidden md:block">
				<h1 className=" text-3xl font-light py-2">Order Summary</h1>
				<div className=" py-4">
					<div className=" flex justify-between">
						<div>Subtotal</div>
						<div>{subtotal.toFixed(2)} €</div>
					</div>
					<div className=" h-[1px] w-full bg-gray-200 my-4" />
					<div className=" flex justify-between">
						<div>Shipping</div>
						<div>{SHIPPING_COST.toFixed(2)} €</div>
					</div>
					<div className=" h-[1px] w-full bg-gray-200 my-4" />
					<div className=" flex justify-between">
						<div>Total</div>
						<div>{total.toFixed(2)} €</div>
					</div>
				</div>
			</div>

			<div className=" hidden md:block pt-8">
				<CheckoutButton className=" rounded-lg w-full bg-primary text-center p-3 text-white hover:opacity-80 hover:cursor-pointer transition-opacity duration-150" />
			</div>
		</div>
	);
}

export function getSubtotal(products: InventoryProduct[], items: CartLocalStorage | null) {
	return products.reduce((acc, { id, price }) => {
		const currentProduct = items?.find(({ id: cartId }) => cartId === id);
		const amount = currentProduct?.amount || 1;
		return acc + Number(price.amount) * amount;
	}, 0);
}
