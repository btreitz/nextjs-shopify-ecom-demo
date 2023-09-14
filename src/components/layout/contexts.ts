'use client';

import { createContext } from 'react';

export const SideBarContext = createContext({
	leftIsOpen: false,
	setLeftIsOpen: (value: boolean) => {},
	rightIsOpen: false,
	setRightIsOpen: (value: boolean) => {},
	closeOpenSidebars: () => {},
});
