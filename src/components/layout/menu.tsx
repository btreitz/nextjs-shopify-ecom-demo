'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import collections from './collections';

export default function Menu() {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		// if isOpen is true, then add a class to the body to prevent scrolling
		if (typeof window !== 'undefined') {
			if (isOpen) {
				document.body.classList.add('overflow-hidden');
			} else {
				document.body.classList.remove('overflow-hidden');
			}
		}
	}, [isOpen]);

	// check if current pathname is active to highlight in navbar
	/*
    const pathname = usePathname();
    */
	return (
		<>
			<button className="flex flex-col h-8 w-12 justify-evenly items-center group" onClick={() => setIsOpen(!isOpen)}>
				<div
					className={` h-[1px] w-6 rounded-full bg-black transition ease-out transform duration-300 opacity-60 group-hover:opacity-100 ${
						isOpen && ' rotate-45 translate-y-[8px]'
					}`}
				/>
				<div
					className={` h-[1px] rounded-full bg-black transition-all ease-out duration-200 opacity-60 group-hover:opacity-100 ${
						isOpen ? ' w-0' : ' w-6'
					}`}
				/>
				<div
					className={` h-[1px] w-6 rounded-full bg-black transition ease-out transform duration-300 opacity-60 group-hover:opacity-100 ${
						isOpen && ' -rotate-45 -translate-y-[8px]'
					}`}
				/>
			</button>

			<div
				className={` absolute left-0 top-20 z-40 w-full h-[calc(100vh-80px)] bg-black/60 cursor-pointer ${
					isOpen === false && ' hidden'
				}`}
				onClick={() => setIsOpen(false)}
			/>
			<div
				className={` absolute left-0 top-20 z-50 w-96 max-w-full xs:w-full h-[calc(100vh-80px)] px-8 bg-backgroundSecondary border-r border-gray-200 cursor-default transition-transform ease-out duration-500 ${
					isOpen === false && ' transform -translate-x-full'
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className=" flex flex-col">
					{collections.map((collection, index) => (
						<div key={index} className=" flex flex-col">
							<Link
								href={{ pathname: '/inventory', query: { category: collection.query } }}
								className=" hoverable mt-4 mb-3"
								onClick={() => setIsOpen(false)}
							>
								<span className=" text-xl">{collection.category}</span>
							</Link>
							{collection.children && (
								<div className=" flex flex-col pl-3">
									{collection.children.map((item, index) => (
										<Link
											href={{ pathname: '/inventory', query: { collection: item.query } }}
											key={index}
											className=" hoverable"
											onClick={() => setIsOpen(false)}
										>
											{item.label}
										</Link>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</>
	);
}
