'use client';

import Link from 'next/link';
import Heart from './icons/Heart';
import useLocalStorage from '@/utils/hooks/useLocalStorage';
import ItemCounter from './itemCounter';

export default function FavoritesNavigation() {
	const { data: encodedProductIds } = useLocalStorage<string[]>({ key: 'ecom-favs' });
	const itemCount = encodedProductIds?.length || 0;

	return (
		<Link href={{ pathname: '/favorites' }} className="hoverable relative">
			{itemCount > 0 && <ItemCounter count={itemCount} />}
			<Heart className="fill-transparent" />
		</Link>
	);
}
