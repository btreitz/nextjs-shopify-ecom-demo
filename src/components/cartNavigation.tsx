'use client';

import Link from 'next/link';
import IconCart from './icons/Cart';
import useLocalStorage from '@/utils/hooks/useLocalStorage';

export default function CartNavigation() {
	const { data: encodedProductIds } = useLocalStorage<string[]>({ key: 'ecom-cart' });
	return (
		<Link href="/cart" className=" hoverable relative">
			{encodedProductIds && encodedProductIds.length > 0 && (
				<span className=" absolute top-[-5px] right-[-5px] bg-primary text-white rounded-full text-[8px] min-w-[12px] text-center">
					{encodedProductIds.length}
				</span>
			)}
			<IconCart />
		</Link>
	);
}
