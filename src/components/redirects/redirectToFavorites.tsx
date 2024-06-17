'use client';

import useLocalStorage from '@/utils/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { arraysEqualUnordered, toStringArray } from '@/utils';
import { FavoritesLocalStorage } from '../addToFavorites';

type RedirectToFavoritesProps = {
	children: React.ReactNode;
	currentIds?: string | string[];
};

export default function RedirectToFavorites({ currentIds, children }: RedirectToFavoritesProps) {
	const router = useRouter();
	const { data: items } = useLocalStorage<FavoritesLocalStorage>({ key: 'ecom-favs' });
	const cleanedEncodedProductIds = useMemo(() => toStringArray(items), [items]);
	const cleanedCurrentIds = useMemo(() => toStringArray(currentIds), [currentIds]);

	// if currentIds is not equal to encodedProductIds, then push the new encodedProductIds to the router
	if (arraysEqualUnordered(cleanedCurrentIds, cleanedEncodedProductIds) === false) {
		const url = new URL('/favorites', window.location.href);
		cleanedEncodedProductIds.forEach((id) => {
			url.searchParams.append('ids', id);
		});
		router.push(url.toString());
	}

	return <>{children}</>;
}
