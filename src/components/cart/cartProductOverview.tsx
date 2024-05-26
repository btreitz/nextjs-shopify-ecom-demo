'use client';

import useLocalStorage from '@/utils/hooks/useLocalStorage';
import CartProduct from './cartProduct';

type CartProductListProps = {};

export default function CartProductList({}: CartProductListProps) {
	const { data: encodedProductIds } = useLocalStorage<string[]>({ key: 'ecom-cart' });
	return (
		<div>
			{encodedProductIds &&
				encodedProductIds.map((id) => {
					return (
						<div key={id}>
							<CartProduct title="Test Title" price={1000} />
							<div className=" h-[1px] w-full bg-gray-200 my-4" />
						</div>
					);
				})}
		</div>
	);
}
