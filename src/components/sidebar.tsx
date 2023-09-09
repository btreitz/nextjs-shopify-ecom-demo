'use client';

import React, { RefObject, useEffect } from 'react';

type SidebarProps = {
	children: React.ReactNode;
	headerRef: RefObject<HTMLElement>;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	orientation: 'left' | 'right';
};

export default function Sidebar({ children, headerRef, isOpen, setIsOpen, orientation }: SidebarProps) {
	const headerHeight = headerRef.current?.clientHeight || 0;

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

	return (
		<>
			{/* Background dimming */}
			<div
				className={` absolute z-40 w-full bg-black/60 cursor-pointer ${isOpen === false && ' hidden'} ${
					orientation === 'left' ? ' left-0' : ' right-0'
				}`}
				style={{ height: `calc(100vh - ${headerHeight}px)`, top: `${headerHeight}px` }}
				onClick={() => setIsOpen(false)}
			/>
			{/* Sidebar */}
			<div
				className={` absolute z-50 w-96 max-w-full xs:w-full px-8 pb-8 overflow-y-auto bg-backgroundSecondary border-r border-gray-200 cursor-default transition-transform ease-out duration-500 ${
					orientation === 'left' ? ' left-0' : ' right-0'
				} ${
					isOpen === false
						? orientation === 'left'
							? ' transform -translate-x-full'
							: ' transform translate-x-full'
						: ''
				}`}
				style={{ height: `calc(100vh - ${headerHeight}px)`, top: `${headerHeight}px` }}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</>
	);
}
