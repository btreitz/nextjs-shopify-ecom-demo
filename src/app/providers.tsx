'use client';

import { SideBarContext } from '@/components/layout/contexts';
import { useState } from 'react';

type ProviderProps = {
	children: React.ReactNode;
};

export function Providers({ children }: ProviderProps) {
	const [leftIsOpen, setLeftIsOpen] = useState(false);
	const [rightIsOpen, setRightIsOpen] = useState(false);
	return (
		<SideBarContext.Provider value={{ leftIsOpen, setLeftIsOpen, rightIsOpen, setRightIsOpen }}>
			{children}
		</SideBarContext.Provider>
	);
}
