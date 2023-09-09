'use client';

import Link from 'next/link';
import { RefObject, useContext, useEffect } from 'react';

import collections from './collections';
import { SideBarContext } from './contexts';
import Sidebar from '../sidebar';

type MenuSidebarProps = {
	headerRef: RefObject<HTMLElement>;
};

export default function MenuSidebar({ headerRef }: MenuSidebarProps) {
	const { leftIsOpen, setLeftIsOpen } = useContext(SideBarContext);

	return (
		<Sidebar headerRef={headerRef} isOpen={leftIsOpen} setIsOpen={setLeftIsOpen} orientation="left">
			<div className=" flex flex-col">
				<div className=" flex flex-col">
					<Link href={{ pathname: '/inventory' }} className=" hoverable mt-4 mb-3" onClick={() => setLeftIsOpen(false)}>
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
		</Sidebar>
	);
}
