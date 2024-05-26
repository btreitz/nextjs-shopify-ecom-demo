'use client';

import useLocalStorage from '@/utils/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

type RedirectToFavoritesProps = {
	currentIds?: string | string[];
};

export default function RedirectToFavorites({ currentIds }: RedirectToFavoritesProps) {
	const router = useRouter();
	const { data: encodedProductIds } = useLocalStorage<string[]>({ key: 'ecom-favs' });
	const cleanedEncodedProductIds = useMemo(() => toStringArray(encodedProductIds), [encodedProductIds]);
	const cleanedCurrentIds = useMemo(() => toStringArray(currentIds), [currentIds]);

	function toStringArray(currentIds: string | string[] | undefined | null): string[] {
		if (typeof currentIds === 'undefined' || currentIds === null) {
			return [];
		} else if (typeof currentIds === 'string') {
			return [currentIds];
		} else {
			return currentIds;
		}
	}

	function arraysEqualUnordered(arr1: string[], arr2: string[]): boolean {
		if (arr1.length !== arr2.length) {
			return false;
		}

		const sortedArr1 = [...arr1].sort();
		const sortedArr2 = [...arr2].sort();

		for (let i = 0; i < sortedArr1.length; i++) {
			if (sortedArr1[i] !== sortedArr2[i]) {
				return false;
			}
		}

		return true;
	}

	// if currentIds is not equal to encodedProductIds, then push the new encodedProductIds to the router
	if (arraysEqualUnordered(cleanedCurrentIds, cleanedEncodedProductIds) === false) {
		const url = new URL('/favorites', window.location.href);
		cleanedEncodedProductIds.forEach((id) => {
			url.searchParams.append('ids', id);
		});
		router.push(url.toString());
	}

	return <></>;
}
