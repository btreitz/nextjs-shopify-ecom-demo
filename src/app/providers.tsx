'use client';

import { SideBarContext } from '@/components/layout/contexts';
import { useState } from 'react';

type ProviderProps = {
	children: React.ReactNode;
};

export function Providers({ children }: ProviderProps) {
	const [leftIsOpen, setLeftIsOpen] = useState(false);
	const [rightIsOpen, setRightIsOpen] = useState(false);

	const closeAllSidebar = () => {
		leftIsOpen && setLeftIsOpen(false);
		rightIsOpen && setRightIsOpen(false);
	};

	const onSetLeftIsOpen = (isOpen: boolean) => {
		if (isOpen) {
			closeAllSidebar();
		}
		setLeftIsOpen(isOpen);
	};

	const onSetRightIsOpen = (isOpen: boolean) => {
		if (isOpen) {
			closeAllSidebar();
		}
		setRightIsOpen(isOpen);
	};

	return (
		<SideBarContext.Provider
			value={{
				leftIsOpen,
				setLeftIsOpen: onSetLeftIsOpen,
				rightIsOpen,
				setRightIsOpen: onSetRightIsOpen,
				closeOpenSidebars: closeAllSidebar,
			}}
		>
			{children}
		</SideBarContext.Provider>
	);
}
