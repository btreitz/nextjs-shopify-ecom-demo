'use client';

import { STORED_ELEMENTS } from '@/utils/hooks/useLocalStorage';
import { createContext } from 'react';

export const SideBarContext = createContext({
	menuSidebarIsOpen: false,
	setMenuSidebarIsOpen: (value: boolean) => {},
	filterSidebarIsOpen: false,
	setFilterSidebarIsOpen: (value: boolean) => {},
	closeSidebars: () => {},
});

export type LocalStorageContext = {
	getValueByKey: <T>(key: (typeof STORED_ELEMENTS)[number]) => T | null;
	setValueByKey: <T>(key: (typeof STORED_ELEMENTS)[number], value: T) => void;
};

export const LocalStorageContext = createContext<LocalStorageContext | null>(null);
