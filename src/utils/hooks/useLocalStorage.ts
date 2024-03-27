import { LocalStorageContext } from '@/components/layout/contexts';
import { useContext, useMemo } from 'react';

export const STORED_ELEMENTS = ['ecom-favs'] as const;

type LocalStorageProps = {
	key: (typeof STORED_ELEMENTS)[number];
};

export default function useLocalStorage<T>({ key }: LocalStorageProps) {
	const { getValueByKey, setValueByKey } = useContext(LocalStorageContext) as LocalStorageContext;

	const data = useMemo<T | null>(() => {
		return getValueByKey<T>(key);
	}, [getValueByKey, key]);

	const setKeyValue = (value: T) => {
		if (typeof window !== 'undefined') {
			setValueByKey(key, value);
		}
	};

	return {
		data,
		key,
		setKeyValue,
	};
}
