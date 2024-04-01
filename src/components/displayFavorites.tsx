'use client';

import useLocalStorage from '@/utils/hooks/useLocalStorage';
import GridHeader from './gridHeader';
import ProductGrid from './productGrid';

export default function DisplayFavorites() {
	const { data } = useLocalStorage<string[]>({ key: 'ecom-favs' });
	console.log('Facorized products: ', data);

	const headerText =
		Array.isArray(data) && data.length > 0 ? `${data.length} Item(s) Favorized` : ' No Items Favorized';

	return (
		<>
			<GridHeader text={headerText} />
			<div className=" h-[1px] w-full bg-gray-200 mb-4" />
			{/* <ProductGrid products={products} /> */}
		</>
	);
}
