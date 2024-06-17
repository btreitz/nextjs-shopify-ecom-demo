'use client';

import Link from 'next/link';
import IconCart from './icons/Cart';
import useLocalStorage from '@/utils/hooks/useLocalStorage';
import { CartLocalStorage } from './addToCart';
import ItemCounter from './itemCounter';

export default function CartNavigation() {
	const { data: items } = useLocalStorage<CartLocalStorage>({ key: 'ecom-cart' });
	const itemCount = items?.length || 0;

	return (
		<Link href="/cart" className=" hoverable relative">
			{itemCount > 0 && <ItemCounter count={itemCount} />}
			<IconCart />
		</Link>
	);
}
