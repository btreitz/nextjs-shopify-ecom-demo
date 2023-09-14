'use client';

import { RefObject, useContext } from 'react';
import { SideBarContext } from './contexts';
import Sidebar from '../sidebar';

type FilterSidebarProps = {
	header: RefObject<HTMLElement>;
};

export default function FilterSidebar({ header }: FilterSidebarProps) {
	const { filterSidebarIsOpen } = useContext(SideBarContext);

	return (
		<Sidebar header={header} isOpen={filterSidebarIsOpen} orientation="left">
			<div className=" flex flex-col">TEST</div>
		</Sidebar>
	);
}
