'use client';

import Link from 'next/link';
import IconCart from './icons/Cart';
import useLocalStorage from '@/utils/hooks/useLocalStorage';
import { CartLocalStorage } from './addToCart';

export default function CartNavigation() {
	const { data: items } = useLocalStorage<CartLocalStorage>({ key: 'ecom-cart' });
	return (
		<Link href="/cart" className=" hoverable relative">
			{items && items.length > 0 && (
				<span className=" absolute top-[-5px] right-[-5px] bg-primary text-white rounded-full text-[8px] min-w-[12px] text-center">
					{items.length}
				</span>
			)}
			<IconCart />
		</Link>
	);
}
