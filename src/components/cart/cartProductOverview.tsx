'use client';

import useLocalStorage from '@/utils/hooks/useLocalStorage';
import CartProduct from './cartProduct';
import { CartLocalStorage } from '../addToCart';

type CartProductListProps = {};

export default function CartProductList({}: CartProductListProps) {
	const { data: items } = useLocalStorage<CartLocalStorage>({ key: 'ecom-cart' });
	return (
		<div>
			{items &&
				items.map(({ id, amount }) => {
					return (
						<div key={id}>
							<CartProduct encodedId={id} amount={amount} title="Test Title" price={1000} />
							<div className=" h-[1px] w-full bg-gray-200 my-4" />
						</div>
					);
				})}
		</div>
	);
}
