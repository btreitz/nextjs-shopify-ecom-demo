'use client';

import useLocalStorage from '@/utils/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { arraysEqualUnordered, toStringArray } from '@/utils';
import { CartLocalStorage } from '../addToCart';

type RedirectToCartProductsProps = {
	children: React.ReactNode;
	currentIds?: string | string[];
};

export default function RedirectToCartProducts({ currentIds, children }: RedirectToCartProductsProps) {
	const router = useRouter();
	const { data: items } = useLocalStorage<CartLocalStorage>({ key: 'ecom-cart' });
	const cleanedEncodedProductIds = useMemo(() => toStringArray(items?.map(({ id }) => id)), [items]);
	const cleanedCurrentIds = useMemo(() => toStringArray(currentIds), [currentIds]);

	// if currentIds is not equal to encodedProductIds, then push the new encodedProductIds to the router
	if (arraysEqualUnordered(cleanedCurrentIds, cleanedEncodedProductIds) === false) {
		const url = new URL('/cart', window.location.href);
		cleanedEncodedProductIds.forEach((id) => {
			url.searchParams.append('ids', id);
		});
		router.push(url.toString());
	}

	return <>{children}</>;
}
