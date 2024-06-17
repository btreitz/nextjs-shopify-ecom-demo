'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

const defaultText = 'Checkout';

type CheckoutButtonProps = {
	className?: string;
};

export default function CheckoutButton({ className }: CheckoutButtonProps) {
	const [text, setText] = useState<string>(defaultText);

	const handleCheckout = () => {
		setText('Sorry this is just a demo 🫤');
		setTimeout(() => {
			setText(defaultText);
		}, 5000);
	};

	return (
		<motion.button onClick={handleCheckout} whileTap={{ scale: 0.9 }} className={`${className}`}>
			<div className=" w-full flex justify-center items-center gap-2">{text}</div>
		</motion.button>
	);
}
