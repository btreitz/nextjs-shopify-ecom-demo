'use-client';

import { useCallback, useEffect, useState } from 'react';
import { collections } from '../layout/collections';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SUPPORTED_PRODUCT_QUERY_PARAMS } from '@/lib/gql/utils/queryParams';
import BaseFilter from './base';

const paramName: keyof typeof SUPPORTED_PRODUCT_QUERY_PARAMS = 'collection';

type CollectionVariant = keyof typeof collections;

type CollectionProps = {};

export default function Collection({}: CollectionProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const getInitialSelection: () => CollectionVariant[] = useCallback(() => {
		const paramValue = searchParams.getAll(paramName).flatMap((value) => value.split(','));
		// filter out invalid values
		const validValues = paramValue.filter((value) => Object.keys(collections).includes(value)) as CollectionVariant[];

		return validValues.length >= 1 ? validValues : (Object.keys(collections) as CollectionVariant[]);
	}, [searchParams]);

	const [selected, setSelected] = useState<CollectionVariant[]>(getInitialSelection());

	useEffect(() => {
		const newSelection = getInitialSelection();
		if (newSelection) setSelected(newSelection);
	}, [getInitialSelection, searchParams]);

	const isSelected = (key: string) => selected.includes(key as CollectionVariant);

	const onSelect = (key: string) => {
		let newSelection: CollectionVariant[] = [];
		if (isSelected(key)) {
			newSelection = selected.filter((item) => item !== key);
		} else {
			newSelection = [...selected, key as CollectionVariant];
		}
		setSelected(newSelection);
		updateQueryParams(newSelection);
	};

	const updateQueryParams = (newSelection: CollectionVariant[]) => {
		const newSearchParams = new URLSearchParams(Array.from(searchParams.entries()));
		if (newSelection.length === 0 || newSelection.length === Object.keys(collections).length) {
			newSearchParams.delete(paramName);
		} else {
			newSearchParams.set(paramName, newSelection.join(','));
		}

		const url = `${pathname}?${newSearchParams.toString()}`;
		router.push(url);
	};

	return <BaseFilter title="Collections" items={collections} isSelected={isSelected} onSelect={onSelect} />;
}
