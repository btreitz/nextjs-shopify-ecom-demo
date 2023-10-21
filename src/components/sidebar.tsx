'use client';

import React, { RefObject, useContext, useEffect, useRef } from 'react';
import { SideBarContext } from './layout/contexts';

type SidebarProps = {
	children: React.ReactNode;
	header: RefObject<HTMLElement>;
	isOpen: boolean;
	orientation: 'left' | 'right';
	className?: string;
};

export default function Sidebar({ children, header, isOpen, orientation, className }: SidebarProps) {
	const headerHeight = header.current?.clientHeight ?? 0;
	const { closeSidebars } = useContext(SideBarContext);
	const sidebarRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		const handleOutsideClick = (e: MouseEvent) => {
			if (isOpen && !sidebarRef.current?.contains(e.target as Node)) {
				closeSidebars();
			}
		};

		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, [isOpen, closeSidebars]);

	return (
		<div
			ref={sidebarRef}
			className={` ${className} absolute z-50 w-96 max-w-full xs:w-full overflow-y-auto border-r border-gray-200 cursor-default transition-transform ease-out duration-500 ${
				orientation === 'left' ? 'left-0' : 'right-0'
			} ${
				isOpen === false ? (orientation === 'left' ? 'transform -translate-x-full' : 'transform translate-x-full') : ''
			}`}
			style={{ height: `calc(100dvh - ${headerHeight}px)`, top: `${headerHeight}px` }}
			onClick={(e) => e.stopPropagation()}
		>
			{children}
		</div>
	);
}
