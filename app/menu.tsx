'use client';
import { useState } from 'react';

export default function Menu() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<button className="flex flex-col h-8 w-12 justify-evenly items-center group" onClick={() => setIsOpen(!isOpen)}>
			<div
				className={` h-[1px] w-6 rounded-full bg-black transition ease transform duration-300 opacity-60 group-hover:opacity-100 ${
					isOpen && ' rotate-45 translate-y-[8px]'
				}`}
			/>
			<div
				className={` h-[1px] rounded-full bg-black transition-all ease duration-200 opacity-60 group-hover:opacity-100 ${
					isOpen ? ' w-0' : ' w-6'
				}`}
			/>
			<div
				className={` h-[1px] w-6 rounded-full bg-black transition ease transform duration-300 opacity-60 group-hover:opacity-100 ${
					isOpen && ' -rotate-45 -translate-y-[8px]'
				}`}
			/>
		</button>
	);
}
