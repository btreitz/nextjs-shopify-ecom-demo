'use client';

import { createContext } from 'react';

export const SideBarContext = createContext({
	menuSidebarIsOpen: false,
	setMenuSidebarIsOpen: (value: boolean) => {},
	filterSidebarIsOpen: false,
	setFilterSidebarIsOpen: (value: boolean) => {},
	closeSidebars: () => {},
});
