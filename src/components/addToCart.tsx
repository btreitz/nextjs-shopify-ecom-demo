'use client';

import { MouseEvent, useMemo } from 'react';
import { motion } from 'framer-motion';

import useLocalStorage from '@/utils/hooks/useLocalStorage';

type AddToCartProps = {
	encodedId: string;
	heartHeight?: number;
	className?: string;
};

export default function AddToCart({ encodedId, className }: AddToCartProps) {
	const { data, setKeyValue } = useLocalStorage<string[]>({ key: 'ecom-cart' });

	const isInCart = useMemo(() => {
		return data ? data.includes(encodedId) : false;
	}, [data, encodedId]);

	const toogleCart = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		isInCart ? removeItemFromLocalStorage() : addItemToLocalStorage();
	};

	function addItemToLocalStorage() {
		setKeyValue(data ? [...data, encodedId] : [encodedId]);
	}

	function removeItemFromLocalStorage() {
		const ids = data ? data.filter((id) => id !== encodedId) : [];
		setKeyValue(ids);
	}

	return (
		<motion.button whileTap={{ scale: 0.9 }} className={`${className}`} onClick={toogleCart}>
			{isInCart ? 'Remove from cart' : 'Add to cart'}
		</motion.button>
	);
}
