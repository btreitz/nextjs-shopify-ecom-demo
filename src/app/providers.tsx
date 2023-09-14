'use client';

import { SideBarContext } from '@/components/layout/contexts';
import { useState } from 'react';

type ProviderProps = {
	children: React.ReactNode;
};

export function Providers({ children }: ProviderProps) {
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
