'use client';

import { MouseEvent, useMemo } from 'react';
import { motion } from 'framer-motion';

import Heart from './icons/Heart';
import useLocalStorage from '@/utils/hooks/useLocalStorage';

export type FavoritesLocalStorage = string[];

type AddToFavoritesProps = {
	encodedId: string;
	heartHeight?: number;
	className?: string;
};

export default function AddToFavorites({ encodedId, heartHeight = 26, className }: AddToFavoritesProps) {
	const { data, setKeyValue } = useLocalStorage<FavoritesLocalStorage>({ key: 'ecom-favs' });

	const isFavourized = useMemo(() => {
		return data ? data.includes(encodedId) : false;
	}, [data, encodedId]);

	const toogleFavorize = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		isFavourized ? removeItemFromLocalStorage() : addItemToLocalStorage();
	};

	function addItemToLocalStorage() {
		setKeyValue(data ? [...data, encodedId] : [encodedId]);
	}

	function removeItemFromLocalStorage() {
		const ids = data ? data.filter((id) => id !== encodedId) : [];
		setKeyValue(ids);
	}

	return (
		<motion.button
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.8 }}
			className={`${className} hoverable`}
			onClick={toogleFavorize}
		>
			<Heart key={encodedId} fill={isFavourized ? '#126160' : 'transparent'} height={heartHeight} />
		</motion.button>
	);
}
