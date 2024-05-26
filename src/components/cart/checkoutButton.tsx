'use client';

import { motion } from 'framer-motion';
import Arrow from '../icons/Arrow';

type CheckoutButtonProps = {
	className?: string;
};

export default function CheckoutButton({ className }: CheckoutButtonProps) {
	return (
		<motion.button whileTap={{ scale: 0.9 }} className={`${className}`}>
			<div className=" w-full flex justify-center items-center gap-2">
				Checkout <Arrow className=" fill-white h-7" />
			</div>
		</motion.button>
	);
}
