'use client';

import { MouseEvent, useMemo } from 'react';
import { motion } from 'framer-motion';

import Heart from './icons/Heart';
import useLocalStorage from '@/utils/hooks/useLocalStorage';

type FavorizeProps = {
	encodedId: string;
	heartHeight?: number;
	className?: string;
};

export default function Favorize({ encodedId, heartHeight = 26, className }: FavorizeProps) {
	const { data, setKeyValue } = useLocalStorage<string[]>({ key: 'ecom-favs' });

	const isFavourized = useMemo(() => {
		return data ? data.includes(encodedId) : false;
	}, [data, encodedId]);

	const toogleFavorize = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		isFavourized ? removeItemFromLocalStorage() : addItemToLocalStorage();
	};

	function addItemToLocalStorage() {
		console.log('Encoded ID: ', encodedId);
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
