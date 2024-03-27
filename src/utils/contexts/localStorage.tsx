'use client';

import { use, useEffect, useState } from 'react';
import { LocalStorageContext } from '@/components/layout/contexts';
import { STORED_ELEMENTS } from '../hooks/useLocalStorage';

type LocalStorageProviderProps = {
	children: React.ReactNode;
};

export function LocalStorageProvider({ children }: LocalStorageProviderProps) {
	const [elements, setElements] = useState<Map<(typeof STORED_ELEMENTS)[number], unknown>>(() => {
		// get all key value paris with the key of STORED_ELEMENTS and set elements
		const initialElements = new Map<(typeof STORED_ELEMENTS)[number], unknown>();
		for (const key of STORED_ELEMENTS) {
			const value = localStorage.getItem(key);
			if (value) {
				initialElements.set(key, JSON.parse(value));
			}
		}
		return initialElements;
	});

	// listen to changes of "elements" and update localStorage
	useEffect(() => {
		if (typeof window !== 'undefined') {
			elements.forEach((value, key) => {
				localStorage.setItem(key, JSON.stringify(value));
			});
		}
	}, [elements]);

	function getValueByKey<T>(key: (typeof STORED_ELEMENTS)[number]): T | null {
		if (elements.has(key)) {
			return elements.get(key) as T;
		}
		return null;
	}

	function setValueByKey<T>(key: (typeof STORED_ELEMENTS)[number], value: T) {
		const newMap = new Map(elements);
		newMap.set(key, value);
		setElements(newMap);
	}

	return (
		<LocalStorageContext.Provider
			value={{
				getValueByKey: getValueByKey,
				setValueByKey: setValueByKey,
			}}
		>
			{children}
		</LocalStorageContext.Provider>
	);
}
