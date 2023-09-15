'use client';

import { RefObject } from 'react';
import FilterSidebar from './filterSidebar';
import MenuSidebar from './menuSidebar';
import SidebarBackground from './sidebarBackground';

type SidebarsProps = {
	header: RefObject<HTMLElement>;
};

export default function Sidebars({ header }: SidebarsProps) {
	return (
		<>
			<MenuSidebar header={header} />
			<FilterSidebar header={header} />
			<SidebarBackground header={header} />
		</>
	);
}
