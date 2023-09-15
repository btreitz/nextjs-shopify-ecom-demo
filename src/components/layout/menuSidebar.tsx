'use client';

import Link from 'next/link';
import { RefObject, useContext } from 'react';

import { menu } from './collections';
import { SideBarContext } from './contexts';
import Sidebar from '../sidebar';

type MenuSidebarProps = {
	header: RefObject<HTMLElement>;
};

export default function MenuSidebar({ header }: MenuSidebarProps) {
	const { menuSidebarIsOpen, setMenuSidebarIsOpen } = useContext(SideBarContext);

	return (
		<Sidebar
			className={` px-8 pb-8 bg-backgroundSecondary`}
			header={header}
			isOpen={menuSidebarIsOpen}
			orientation="left"
		>
			<div className=" flex flex-col">
				<div className=" flex flex-col">
					<Link
						href={{ pathname: '/inventory' }}
						className=" hoverable mt-4 mb-3"
						onClick={() => setMenuSidebarIsOpen(false)}
					>
						<span className=" text-xl">All Collections</span>
					</Link>
				</div>
				{menu.map((collectionType, index) => (
					<div key={index} className=" flex flex-col">
						<Link
							href={{ pathname: '/inventory', query: { category: collectionType.query } }}
							className=" hoverable mt-4 mb-3"
							onClick={() => setMenuSidebarIsOpen(false)}
						>
							<span className=" text-xl">{collectionType.category}</span>
						</Link>
						{collectionType.children && (
							<div className=" flex flex-col pl-3">
								{collectionType.children.map((item, index) => (
									<Link
										href={{ pathname: '/inventory', query: { collection: item.query } }}
										key={index}
										className=" hoverable"
										onClick={() => setMenuSidebarIsOpen(false)}
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
