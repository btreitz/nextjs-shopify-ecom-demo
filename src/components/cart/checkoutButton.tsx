'use client';

import { motion } from 'framer-motion';

type CheckoutButtonProps = {
	className?: string;
};

export default function CheckoutButton({ className }: CheckoutButtonProps) {
	return (
		<motion.button whileTap={{ scale: 0.9 }} className={`${className}`}>
			Checkout
		</motion.button>
	);
}
