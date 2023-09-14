'use-client';

import { RefObject, useContext, useEffect } from 'react';
import FilterSidebar from './filterSidebar';
import MenuSidebar from './menuSidebar';
import SidebarBackground from './sidebarBackground';
import { SideBarContext } from './contexts';

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
