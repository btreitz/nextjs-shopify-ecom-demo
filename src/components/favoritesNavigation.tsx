'use client';

import Link from 'next/link';
import Heart from './icons/Heart';
import useLocalStorage from '@/utils/hooks/useLocalStorage';

export default function FavoritesNavigation() {
	const { data: encodedProductIds } = useLocalStorage<string[]>({ key: 'ecom-favs' });

	return (
		<Link href={{ pathname: '/favorites' }} className="hoverable relative">
			{encodedProductIds && encodedProductIds.length > 0 && (
				<span className=" absolute top-[-5px] right-[-5px] bg-primary text-white rounded-full text-[8px] min-w-[12px] text-center">
					{encodedProductIds.length}
				</span>
			)}
			<Heart className="fill-transparent" />
		</Link>
	);
}
