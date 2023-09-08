'use client';

import Link from 'next/link';
import { RefObject, useContext, useEffect } from 'react';

import collections from './collections';
import { SideBarContext } from './contexts';

type MenuSidebarProps = {
	headerRef: RefObject<HTMLElement>;
};

export default function MenuSidebar({ headerRef }: MenuSidebarProps) {
	const { leftIsOpen, setLeftIsOpen } = useContext(SideBarContext);

	// TODO: Check if current pathname is active to highlight in navbar
	/*
	const pathname = usePathname();
	*/

	const headerHeight = headerRef.current?.clientHeight;

	useEffect(() => {
		// if isOpen is true, then add a class to the body to prevent scrolling
		if (typeof window !== 'undefined') {
			if (leftIsOpen) {
				document.body.classList.add('overflow-hidden');
			} else {
				document.body.classList.remove('overflow-hidden');
			}
		}
	}, [leftIsOpen]);

	return (
		<>
			<div
				className={` absolute left-0 z-40 w-full bg-black/60 cursor-pointer ${leftIsOpen === false && ' hidden'}`}
				style={{ height: `calc(100vh - ${headerHeight}px)`, top: `${headerHeight}px` }}
				onClick={() => setLeftIsOpen(false)}
			/>
			<div
				className={` absolute left-0 z-50 w-96 max-w-full xs:w-full px-8 pb-8 overflow-y-auto bg-backgroundSecondary border-r border-gray-200 cursor-default transition-transform ease-out duration-500 ${
					leftIsOpen === false && ' transform -translate-x-full'
				}`}
				style={{ height: `calc(100vh - ${headerHeight}px)`, top: `${headerHeight}px` }}
				onClick={(e) => e.stopPropagation()}
			>
				<div className=" flex flex-col">
					<div className=" flex flex-col">
						<Link
							href={{ pathname: '/inventory' }}
							className=" hoverable mt-4 mb-3"
							onClick={() => setLeftIsOpen(false)}
						>
							<span className=" text-xl">All Collections</span>
						</Link>
					</div>
					{collections.map((collection, index) => (
						<div key={index} className=" flex flex-col">
							<Link
								href={{ pathname: '/inventory', query: { category: collection.query } }}
								className=" hoverable mt-4 mb-3"
								onClick={() => setLeftIsOpen(false)}
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
											onClick={() => setLeftIsOpen(false)}
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
