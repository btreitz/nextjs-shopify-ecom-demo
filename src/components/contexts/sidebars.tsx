'use client';

import { useState } from 'react';
import { SideBarContext } from '@/components/layout/contexts';

type SidebarsProviderProps = {
	children: React.ReactNode;
};

export function SidebarsProvider({ children }: SidebarsProviderProps) {
	const [menuSidebarIsOpen, setMenuSidebarIsOpen] = useState(false);
	const [filterSidebarIsOpen, setFilterSidebarIsOpen] = useState(false);

	const closeAllSidebars = () => {
		menuSidebarIsOpen && setMenuSidebarIsOpen(false);
		filterSidebarIsOpen && setFilterSidebarIsOpen(false);
	};

	const onSetMenuSidebarIsOpen = (isOpen: boolean) => {
		if (isOpen) {
			closeAllSidebars();
		}
		setMenuSidebarIsOpen(isOpen);
	};

	const onSetFilterSidebarIsOpen = (isOpen: boolean) => {
		if (isOpen) {
			closeAllSidebars();
		}
		setFilterSidebarIsOpen(isOpen);
	};

	return (
		<SideBarContext.Provider
			value={{
				menuSidebarIsOpen,
				setMenuSidebarIsOpen: onSetMenuSidebarIsOpen,
				filterSidebarIsOpen,
				setFilterSidebarIsOpen: onSetFilterSidebarIsOpen,
				closeSidebars: closeAllSidebars,
			}}
		>
			{children}
		</SideBarContext.Provider>
	);
}
