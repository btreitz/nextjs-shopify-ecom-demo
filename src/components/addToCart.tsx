'use client';

import { MouseEvent, useMemo } from 'react';
import { motion } from 'framer-motion';

import useLocalStorage from '@/utils/hooks/useLocalStorage';

export type CartLocalStorage = {
	id: string;
	amount: number;
}[];

type AddToCartProps = {
	encodedId: string;
	heartHeight?: number;
	className?: string;
};

export default function AddToCart({ encodedId, className }: AddToCartProps) {
	const { data: items, setKeyValue } = useLocalStorage<CartLocalStorage>({ key: 'ecom-cart' });

	const isInCart = useMemo(() => {
		return items ? items.some(({ id }) => id === encodedId) : false;
	}, [items, encodedId]);

	const toogleCart = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		isInCart ? removeItemFromLocalStorage() : addItemToLocalStorage();
	};

	function addItemToLocalStorage() {
		setKeyValue(items ? [...items, { id: encodedId, amount: 1 }] : [{ id: encodedId, amount: 1 }]);
	}

	function removeItemFromLocalStorage() {
		const ids = items ? items.filter(({ id }) => id !== encodedId) : [];
		setKeyValue(ids);
	}

	return (
		<motion.button whileTap={{ scale: 0.9 }} className={`${className}`} onClick={toogleCart}>
			{isInCart ? 'Remove from cart' : 'Add to cart'}
		</motion.button>
	);
}
