'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Menu() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
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
			<div
				className={` absolute left-0 top-20 z-50 w-full h-[calc(100vh-80px)] bg-black/60 cursor-pointer transition-transform ease duration-200 ${
					isOpen === false && ' transform -translate-x-full'
				}`}
				onClick={() => setIsOpen(false)}
			>
				<div
					className={` w-96 max-w-full h-full px-8 bg-backgroundSecondary border-r border-gray-200 cursor-default`}
					onClick={(e) => e.stopPropagation()}
				>
					<div className=" flex flex-col">
						<h2>Collections</h2>
						<Link href="#">Link 1</Link>
					</div>
				</div>
			</div>
		</>
	);
}
